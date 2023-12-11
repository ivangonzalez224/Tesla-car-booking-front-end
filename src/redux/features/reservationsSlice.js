import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  isLoading: true,
  error: null,
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (userId) => {
  const url = `http://127.0.0.1:3000/api/v1/users/${userId}/reservations`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations(state, action) {
      state.reservations = action.payload;
      state.isLoading = false;
      state.error = '';
    },

  },
  extraReducers: {
    // Fetch Reservations
    [fetchReservations.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchReservations.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reservations = action.payload;
    },
    [fetchReservations.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});


export const getAllReservations = (state) => state.reservations.reservations;
export default reservationsSlice.reducer;
