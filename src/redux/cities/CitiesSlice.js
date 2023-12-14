import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCities = createAsyncThunk(
  'details/getCities',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://script.googleusercontent.com/macros/echo?user_content_key=ZaS6kaF1RiJJv33San3YEzhbkxpRuKJYMgG-cdc17wkI8SHLcTlN-EJ9Qb244wEq6dtafsCR13lJo1xlaXsoxMNcllTpAzswm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF-EvUXa0pBYOa9ojbfjcRp3s3V07BdLzN5fhZ8qYvSnR2NfuA1it-jF9RlBw5VNO4pcpjhBmqNrjvPIPOZT-JA8Aqk7ZQ4ottz9Jw9Md8uu&lib=MYuVXWhIV-MXg6Ew3igpOBH4uQVR1hCLo',
      );
      const data = response;
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const initialState = {
  cityItems: [],
  error: '',
};
const citiesSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cityItems = action.payload;
    });
    builder.addCase(getCities.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default citiesSlice.reducer;
