/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { username, id } = JSON.parse(localStorage.getItem('Token')) || {};
  const idNumber = parseInt(id, 10);
  const { cars } = useSelector((state) => state.cars);
  const filteredCars = cars.filter((car) => !car.is_removed);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      city: selectedCity,
      car_id: selectedCar,
      test_date: selectedDate,
      user_id: idNumber,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to make reservation.');
      }

      await response.json();
      navigate('/mainPage');
    } catch (error) {
      throw new Error(error || 'Failed to make reservation.');
    }
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
              <option key={car.id} value={car.id}>
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
