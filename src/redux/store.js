import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/carsSlice';
import citiesReducer from './cities/CitiesSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    cities: citiesReducer,
  },
});

export default store;
