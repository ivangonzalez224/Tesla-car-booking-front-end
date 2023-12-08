import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { carId } = useParams();
  const { cars } = useSelector((state) => state.cars);
  const cardName = cars.filter(
    (item) => item.id === parseInt(carId, 10),
  );

  const { username, id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const idNumber = parseInt(id, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      city: selectedCity,
      car_id: carId,
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
      navigate('/reservations');
    } catch (error) {
      throw new Error(error || 'Failed to make reservation.');
    }
  };

  return (
    <div className="reserve-container">
      <Link to="/mainPage"> Go Back </Link>
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
            <span>Car model: { cardName[0].name }</span>
            
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
