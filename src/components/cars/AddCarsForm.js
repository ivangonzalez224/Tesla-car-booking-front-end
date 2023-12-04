import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewCars, fetchCars } from '../../redux/features/carsSlice';
import Navbar from '../Navbar';

function AddCarsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [name, setTitle] = useState('');
  const [image, setPhoto] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [financeFee, setFinanceFee] = useState('');
  const [optionPurchase, setOptionPurchase] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDiscription] = useState('');
  const [duration, setDuration] = useState('');
  const [pending, setPending] = useState('Add Car');

  const nameHandlers = (e) => setTitle(e.target.value);
  const photoHandlers = (e) => setPhoto(e.target.value);
  const colorHandlers = (e) => setColor(e.target.value);
  const financeFeeHandlers = (e) => setFinanceFee(e.target.value);
  const optionPurchaseHandlers = (e) => setOptionPurchase(e.target.value);
  const totalAmountHandlers = (e) => setTotalAmount(e.target.value);
  const DescriptionHandlers = (e) => setDiscription(e.target.value);
  const YearHandlers = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setYear(parsedValue);
  };
  const DurationHandlers = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setDuration(parsedValue);
  };

  const postDispatcher = () => {
    const carsDetail = {
      name,
      image,
      year,
      color,
      finance_fee: financeFee,
      option_to_purchase: optionPurchase,
      total_amount_payable: totalAmount,
      description,
      duration,
    };

    setPending('...Adding new car');

    dispatch(addNewCars({ car: carsDetail, id }));

    setTimeout(() => {
      dispatch(fetchCars(id));
      setPending('Add Car');
      navigate('/mainPage');
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="Add-car-container container mt-3">
        <div className="card ">
          <h2>Add New Car</h2>
          <div className="card-body">
            <form>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_name"
                  id="cars_id"
                  placeholder="Car name"
                  onChange={(e) => {
                    nameHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_photo"
                  id="cars_photo"
                  placeholder="Car image url"
                  onChange={(e) => {
                    photoHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="car_color"
                  id="car_color"
                  placeholder="Car color"
                  onChange={(e) => {
                    colorHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_model"
                  id="cars_model"
                  placeholder="Car year"
                  onChange={(e) => {
                    YearHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_financefee"
                  id="cars_financefee"
                  placeholder="Car finance fee"
                  onChange={(e) => {
                    financeFeeHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars"
                  id="cars"
                  placeholder="Car option to purchase"
                  onChange={(e) => {
                    optionPurchaseHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_totalAmount"
                  id="cars_totalAmount"
                  placeholder="Car total Amount"
                  onChange={(e) => {
                    totalAmountHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <textarea
                  cols="30"
                  rows="3"
                  className="form-control"
                  type="text"
                  name="cars_discription"
                  id="cars_Discription"
                  placeholder="Car description"
                  onChange={(e) => {
                    DescriptionHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="cars_duration"
                  id="cars_Duration"
                  placeholder="Car duration"
                  onChange={(e) => {
                    DurationHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary"
                  type="button"
                  name="Add-Cars"
                  id="AddCars"
                  onClick={() => {
                    postDispatcher();
                  }}
                >
                  {pending}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCarsForm;
