import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CityDropdown({ onSelectCity }) {
  const cityItems = useSelector((store) => store.cities);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(cityItems.cityItems);
  }, [cityItems.cityItems]);

  const handleCityChange = (event) => {
    onSelectCity(event.target.value);
  };

  return (
    <div>
      <label htmlFor="cityList">Choose a city:</label>
      <select
        id="cityList"
        name="cityList"
        onChange={handleCityChange}
        required
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>
    </div>
  );
}

CityDropdown.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
};

function ReserveDetails() {
  
  const { carId } = useParams();
  const car_id = carId.split('??')[0];
  const car_name = carId.split('??')[1];
  console.log(car_name);

  const { username, id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const idNumber = parseInt(id, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      city: selectedCity,
      car_id: car_id,
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
        <form className="form-reserve" onSubmit={handleSubmit}>
          <CityDropdown onSelectCity={(city) => setSelectedCity(city)} />
          <div>
            <span>{ car_name }</span>
            
          </div>
          <div>
            <label htmlFor="reserve-date">
              Select a date for the test:
              <input
                type="datetime-local"
                id="reserve-date"
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="reserve-btn" type="submit">Reserve</button>
        </form>
      </div>
    </div>

  );
}

export default ReserveDetails;
