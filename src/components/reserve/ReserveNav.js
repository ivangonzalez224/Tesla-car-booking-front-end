/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CityDropdown({ onSelectCity }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((data) => setCountries(data.map((country) => ({ code: country.alpha2Code, name: country.name }))))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCities(['City 1', 'City 2', 'City 3']);
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    onSelectCity(country, '');
  };

  const handleCityChange = (event) => {
    onSelectCity(selectedCountry, event.target.value);
  };

  return (
    <div>
      <label htmlFor="countryList">Choose a country:</label>
      <select
        id="countryList"
        name="countryList"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select a country</option>
        {countries.map(({ code, name }, index) => (
          <option key={index} value={code}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="cityList">Choose a city:</label>
      <select
        id="cityList"
        name="cityList"
        value={cities}
        onChange={handleCityChange}
        disabled={!selectedCountry}
      >
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

CityDropdown.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
};

function ReserveNav() {
  const { username } = JSON.parse(localStorage.getItem('Token')) || {};
  const { cars } = useSelector((state) => state.cars);
  const filteredCars = cars.filter((car) => !car.is_removed);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    const reservationData = {
      selectedCity,
      selectedCar,
      selectedDate,
    };
    console.log('Reservation Data:', reservationData);
  };

  return (
    <div className="reserve-container">
      <h3 id="reserve-title">Reserve a Test Drive</h3>
      <div className="reserve-content">
        <p>
          User:
          {' '}
          {username}
        </p>
        <CityDropdown onSelectCity={(country, city) => setSelectedCity(city)} />
        <div>
          Select a car:
          <select
            id="reserve-carSelect"
            onChange={(e) => setSelectedCar(e.target.value)}
            required
          >
            <option value="">Select a car</option>
            {filteredCars.map((car) => (
              <option key={car.id} value={car.name}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Select a date for the test:
          <input
            type="datetime-local"
            id="reserve-date"
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <button className="reserve-btn" type="button" onClick={handleSubmit}>
          Reserve
        </button>
      </div>
    </div>
  );
}

export default ReserveNav;
