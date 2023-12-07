import React from 'react';
import { useSelector } from 'react-redux';

function ReserveNav() {
  const { username } = JSON.parse(localStorage.getItem('Token')) || {};
  const { cars } = useSelector((state) => state.cars);
  const filteredCars = cars.filter((car) => !car.is_removed);

  return (
    <>
      <div className="reserve-container">
        <h3 id="reserve-title">Reserve a Test Drive</h3>
        <div className="reserve-content">
        <p>
         User: { username } 
        </p>
        Select a car:
        <select 
          id=""
          required
        >
          {filteredCars.map((car) => (
              <option key={car.id}>
                 {car.name}
              </option>
          ))}    
        </select>
        </div> 
      </div>
    </>
  );
}

export default ReserveNav;