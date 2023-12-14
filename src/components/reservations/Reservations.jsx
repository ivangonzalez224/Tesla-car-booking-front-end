/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { fetchReservations } from '../../redux/features/reservationsSlice';
import '../../assets/css/deleteCar.css';

const Reservations = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};

  useEffect(() => {
    dispatch(fetchReservations(id));
  }, [dispatch, id]);

  const { reservations } = useSelector((state) => state.reservations);

  return (
    <>
      <Navbar />
      <div className="delete-cars-container">
        <h3 id="deleteTitle">My Reservations</h3>
        <table>
          <thead>
            <tr>
              <th className="delete-car-name">
                <div className="header-container">Car Name</div>
              </th>
              <th className="actions">Test date</th>
              <th className="actions">City</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td className="delete-car-name" colSpan="3">No reservations</td>
              </tr>
            )}
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="delete-car-name">{reservation.car.name}</td>
                <td className="delete-car-name">{reservation.test_date}</td>
                <td className="delete-car-name">{reservation.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
