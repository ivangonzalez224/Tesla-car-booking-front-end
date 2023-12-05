import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import '../../assets/css/deleteCar.css';

function DeleteCar() {
  const { cars } = useSelector((state) => state.cars);
  return (
    <>
      <Navbar />
      <div className="delete-car-container">
        <h3 id="deleteTitle">Available Cars List</h3>
        <table>
          <thead>
            <tr>
              <th className="delete-car-name">
                <div className="header-container">Car Name</div>
              </th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="delete-car-name">{car.name}</td>
                <td className="actions">
                  <button className="delete-carBtn" type="button" onClick={() => handleDeleteCar(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DeleteCar;
