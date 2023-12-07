import React from 'react';
import { useSelector } from 'react-redux';

function ReserveNav() {
  const { username } = JSON.parse(localStorage.getItem('Token')) || {};
  const { cars } = useSelector((state) => state.cars);
  const filteredCars = cars.filter((car) => !car.is_removed);

  return (
    <div className="reserve-container">
      <h3 id="reserve-title">Reserve a Test Drive</h3>
      <div className="reserve-content">
        <p>
          User:
          {' '}
          { username }
        </p>
        <div>
          Select a car:
          <select
            id="reserve-carSelect"
            required
          >
            {filteredCars.map((car) => (
              <option key={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Select a city:
          <select
            id="reserve-city"
            required
          >
            {filteredCars.map((car) => (
              <option key={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Select a date for the test:
          <input
            type="datetime"
            id="reserve-date"
            required
          />
        </div>
        <button className="reserve-btn" type="submit">Reserve</button>
      </div>
    </div>
  );
}

export default ReserveNav;
