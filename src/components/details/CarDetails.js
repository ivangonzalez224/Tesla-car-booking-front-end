/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { fetchCarById } from '../../redux/features/carsSlice';
import '../../assets/css/detailsPage.css';

function CarDetails() {
  const dispatch = useDispatch();
  const { userId, carId } = useParams();
  const carDetails = useSelector((state) => state.cars.carById);

  useEffect(() => {
    if (userId && carId) {
      dispatch(fetchCarById({ userId, carId }));
    }
  }, [dispatch, userId, carId]);

  console.log(carDetails);
  console.log(carDetails.name);

  return (
    <>
      <Navbar />
      <div>
        <h2 className="headerDetails">Car Details</h2>
        {carDetails.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="Details">
            <img src={carDetails.image} alt={carDetails.name} />
            <h3>{carDetails.name}</h3>
            <p>Color: {carDetails.color}</p>
            <p>Year: {carDetails.year}</p>
            <p>Finance Fee: {carDetails.finance_fee}</p>
            <p>Option to Purchase: {carDetails.option_to_purchase}</p>
            <p>Total Amount Payable: {carDetails.total_amount_payable}</p>
            <Link to={`/reserveDetails/${carId + '??' + carDetails.name}`}> Reserved </Link>
            <p>Duration: {carDetails.duration} months</p>
            <p>Description: {carDetails.description}</p>
            {/* Reserved Button - Link to the Reserve Page */}
            
          </div>
        )}
      </div>
    </>
  );
}

export default CarDetails;
