import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carRemoved } from '../../redux/features/carsSlice';
import Navbar from '../Navbar';
import '../../assets/css/deleteCar.css';

function DeleteCar() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const filteredCars = cars.filter((car) => !car.is_removed);

  const handleDeleteCar = (carId) => {
    dispatch(carRemoved(carId));
  };

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
            {filteredCars.map((car) => (
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
