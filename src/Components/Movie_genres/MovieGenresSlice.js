// MovieGenresSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  movieGenres: [],
  status: 'idle',
  error: null,
};

export const fetchMovieGenres = createAsyncThunk('movieGenres/fetchMovieGenres', async () => {
  const response = await fetch('https://localhost:44301/api/Movie_Genres/GetAllMovie_Genres');
  const data = await response.json();
  return data;
});

export const insertMovieGenres = createAsyncThunk('movieGenres/insertMovieGenres', async (movieGenres) => {
  const response = await fetch('https://localhost:44301/api/Movie_Genres/InsertMoviegenres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieGenres),
  });
  const data = await response.json();
  return data;
});

export const updateMovieGenres = createAsyncThunk('movieGenres/updateMovieGenres', async (movieGenres) => {
  const response = await fetch('https://localhost:44301/api/Movie_Genres/UpdateMoviegenres', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieGenres),
  });
  const data = await response.json();
  return data;
});

export const deleteMovieGenres = createAsyncThunk('movieGenres/deleteMovieGenres', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Movie_Genres/DeleteMovieGenres?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const movieGenresSlice = createSlice({
  name: 'movieGenres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieGenres = action.payload;
      })
      .addCase(fetchMovieGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertMovieGenres.fulfilled, (state, action) => {
        state.movieGenres.push(action.payload);
      })
      .addCase(updateMovieGenres.fulfilled, (state, action) => {
        const { id, ...updatedMovieGenres } = action.payload;
        const existingMovieGenres = state.movieGenres.find((genre) => genre.id === id);
        if (existingMovieGenres) {
          Object.assign(existingMovieGenres, updatedMovieGenres);
        }
      })
      .addCase(deleteMovieGenres.fulfilled, (state, action) => {
        state.movieGenres = state.movieGenres.filter((genre) => genre.id !== action.payload.id);
      });
  },
});

export default movieGenresSlice.reducer;
export const selectMovieGenres = (state) => state.movieGenres.movieGenres;
export const selectMovieGenresStatus = (state) => state.movieGenres.status;
export const selectMovieGenresError = (state) => state.movieGenres.error;
