import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AddCarsForm from './components/cars/AddCarsForm';
// import Navbar from './components/Navbar';
import MainPage from './components/cars/MainPage';
import DeleteCar from './components/cars/DeleteCar';
import Reservations from './components/reservations/Reservations';
import CarDetails from './components/cars/CarDetails';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route exact path="/" element={<AddCarsForm />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/details/:id" element={<CarDetails />} />
        <Route path="/cars/delete" element={<DeleteCar />} />
        <Route path="/reservations" element={<Reservations />} />
      </Route>
    </Routes>
  );
}

export default App;
