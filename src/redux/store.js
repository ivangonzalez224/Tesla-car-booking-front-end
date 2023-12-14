import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/carsSlice';
import citiesReducer from './cities/CitiesSlice';
import reservationsReducer from './features/reservationsSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    cities: citiesReducer,
    reservations: reservationsReducer,
  },
});

export default store;
