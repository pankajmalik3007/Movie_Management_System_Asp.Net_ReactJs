
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOVIE_API_BASE_URL = 'https://localhost:44301/api/Movie';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch(`${MOVIE_API_BASE_URL}/GetAllMovies`);
  const data = await response.json();
  return data;
});

export const insertMovie = createAsyncThunk('movies/insertMovie', async (movie) => {
  const response = await fetch(`${MOVIE_API_BASE_URL}/InsertMovie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  return data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, updatedMovie }) => {
    const response = await fetch(`${MOVIE_API_BASE_URL}/UpdateMovie?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });
    const data = await response.json();
    return data;
  });
  

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  const response = await fetch(`${MOVIE_API_BASE_URL}/DeleteMovie?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movieList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertMovie.fulfilled, (state, action) => {
        state.movieList.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        const index = state.movieList.findIndex((movie) => movie.id === updatedMovie.id);
        if (index !== -1) {
          state.movieList[index] = updatedMovie;
        }
      })
      
      
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const id = action.payload;
        state.movieList = state.movieList.filter((movie) => movie.id !== id);
      });
  },
});

export default movieSlice.reducer;



