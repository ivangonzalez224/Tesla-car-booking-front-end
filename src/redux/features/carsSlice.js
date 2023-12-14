import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  cars: [],
  carById: {},
  reservedCar: {},
  isLoading: true,
  error: null,
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async (userId) => {
  const url = `https://tesla-car-booking-q0hb.onrender.com/api/v1/users/${userId}/cars`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (data) => {
  const url = `https://tesla-car-booking-q0hb.onrender.com/api/v1/users/${data.userId}/cars/${data.carId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const addNewCars = createAsyncThunk('cars/addNewCars', async (data) => {
  const { authToken } = data.id;
  try {
    const config = {
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
    };
    const baseUrl = `https://tesla-car-booking-q0hb.onrender.com/api/v1/users/${data.id}/cars`;

    const response = await axios.post(
      baseUrl,
      JSON.stringify({
        car: data.car,
      }),
      config,
    );
    toast.success(`Car Successfully ${response.statusText} `);
    return response.data;
  } catch (error) {
    toast.error('Opps failed to create Car');
    throw Error(error);
  }
});

export const updateCars = createAsyncThunk('cars/updateCars', async (data) => {
  const { authToken } = data.id;
  const { carId } = data;
  const isRemoved = data.car.is_removed;

  try {
    const config = {
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
    };
    const baseUrl = `https://tesla-car-booking-q0hb.onrender.com/api/v1/users/${data.id}/cars/${carId}`;

    const response = await axios.delete(
      baseUrl,
      JSON.stringify({
        isRemoved,
      }),
      config,
    );
    toast.success(`Car Successfully ${response.statusText} `);
    return response.data;
  } catch (error) {
    toast.error('Opps failed to update Car');
    throw Error(error);
  }
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    carCreated: (state, action) => {
      state.cars?.push(action.payload);
    },
    reserveCar(state, action) {
      const id = action.payload;
      const reserved = state.cars.cars.find((car) => car.id === id);
      state.reservedCar = reserved;
    },
    carRemoved: (state, action) => {
      const car = state.cars.find((car) => car.id === action.payload);
      if (car) {
        car.is_removed = true;
      }
    },
  },
  extraReducers: {
    // Fetch Cars
    [fetchCars.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCars.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cars = action.payload;
    },
    [fetchCars.rejected]: (state) => {
      state.isLoading = false;
    },
    // Fetch Car By Id
    [fetchCarById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCarById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.carById = action.payload;
    },
    [fetchCarById.rejected]: (state) => {
      state.isLoading = false;
    },
    // Add New Car
    [addNewCars.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewCars.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cars.push(action.payload);
    },
    [addNewCars.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const carRemoved = (carId) => ({
  type: 'cars/carRemoved',
  payload: carId,
});
export const getAllCars = (state) => state.cars.cars;
export default carsSlice.reducer;
