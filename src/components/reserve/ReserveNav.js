/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCities from './cityService';

function CityDropdown({ onSelectCity }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(fetchCities());
  }, []);

  const handleCityChange = (event) => {
    onSelectCity('', event.target.value);
  };

  return (
    <div>
      <label htmlFor="cityList">Choose a city:</label>
      <select
        id="cityList"
        name="cityList"
        onChange={handleCityChange}
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
