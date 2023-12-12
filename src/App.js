/* eslint-disable react/function-component-definition */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AddCarsForm from './components/cars/AddCarsForm';
import Session from './components/session/Session';
import MainPage from './components/cars/MainPage';
import DeleteCar from './components/cars/DeleteCar';
import Reservations from './components/reservations/Reservations';
import CarDetails from './components/details/CarDetails';
import ReserveNav from './components/reserve/ReserveNav';
import ReserveDetails from './components/reserve/ReserveDetails';

const App = () => (
  <Routes>
    <Route path="/" element={<Session />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<RequireAuth />}>
      <Route exact path="/addCar" element={<AddCarsForm />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/details/:carId" element={<CarDetails />} />
      <Route path="/cars/delete" element={<DeleteCar />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/reserveNav" element={<ReserveNav />} />
      <Route path="/reserveDetails/:carId" element={<ReserveDetails />} />
    </Route>
  </Routes>
);

export default App;
