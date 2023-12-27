import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  ratings: [],
  status: 'idle',
  error: null,
};


export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const response = await axios.get('https://localhost:44301/api/Rating/GetAllRating');
  return response.data;
});


export const insertRating = createAsyncThunk('ratings/insertRating', async (ratingInput) => {
  const response = await axios.post('https://localhost:44301/api/Rating/InsertRating', ratingInput);
  return response.data;
});


const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings.push(action.payload);
      })
      .addCase(insertRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default ratingSlice.reducer;
export const selectRatings = (state) => state.ratings.ratings;
export const selectRatingsStatus = (state) => state.ratings.status;
export const selectRatingsError = (state) => state.ratings.error;
