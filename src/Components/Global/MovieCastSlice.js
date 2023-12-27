import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  movieCasts: [],
  status: 'idle',
  error: null,
};

export const fetchMovieCasts = createAsyncThunk('movieCasts/fetchMovieCasts', async () => {
  const response = await fetch('https://localhost:44301/api/Movie_Cast/GetAllMovieCast');
  const data = await response.json();
  return data;
});

export const insertMovieCast = createAsyncThunk('movieCasts/insertMovieCast', async (movieCast) => {
  const response = await fetch('https://localhost:44301/api/Movie_Cast/InsertMovie_Cast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieCast),
  });
  const data = await response.json();
  return data;
});

export const updateMovieCast = createAsyncThunk('movieCasts/updateMovieCast', async (movieCast) => {
  const response = await fetch('https://localhost:44301/api/Movie_Cast/Update_Move_Cast', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieCast),
  });
  const data = await response.json();
  return data;
});

export const deleteMovieCast = createAsyncThunk('movieCasts/deleteMovieCast', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Movie_Cast/DeleteMovieCast?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const movieCastSlice = createSlice({
  name: 'movieCasts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieCasts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieCasts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieCasts = action.payload;
      })
      .addCase(fetchMovieCasts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertMovieCast.fulfilled, (state, action) => {
        state.movieCasts.push(action.payload);
      })
      .addCase(updateMovieCast.fulfilled, (state, action) => {
        const { id, ...updatedMovieCast } = action.payload;
        const existingMovieCast = state.movieCasts.find((movieCast) => movieCast.id === id);
        if (existingMovieCast) {
          Object.assign(existingMovieCast, updatedMovieCast);
        }
      })
      .addCase(deleteMovieCast.fulfilled, (state, action) => {
        state.movieCasts = state.movieCasts.filter((movieCast) => movieCast.id !== action.payload.id);
      });
  },
});

export default movieCastSlice.reducer;
export const selectMovieCasts = (state) => state.movieCasts.movieCasts;
export const selectMovieCastsStatus = (state) => state.movieCasts.status;
export const selectMovieCastsError = (state) => state.movieCasts.error;
