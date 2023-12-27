// GlobalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for the global slice
const initialState = {
  genres: [],
  movieCast: [],
  movieGenres: [],
  movieDirection: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching all genres
export const fetchGenres = createAsyncThunk('global/fetchGenres', async () => {
  const response = await fetch('https://localhost:44301/api/Genres/GetAllGenres');
  const data = await response.json();
  return data;
});

// Create an async thunk for inserting a genre
export const insertGenres = createAsyncThunk('global/insertGenres', async (genre) => {
  const response = await fetch('https://localhost:44301/api/Genres/InsertGenres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for updating a genre
export const updateGenres = createAsyncThunk('global/updateGenres', async (genre) => {
  const response = await fetch('https://localhost:44301/api/Genres/UpdateGenres', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(genre),
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for deleting a genre
export const deleteGenres = createAsyncThunk('global/deleteGenres', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Genres/DeleteGenres?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for fetching all movie cast
export const fetchMovieCast = createAsyncThunk('global/fetchMovieCast', async () => {
  const response = await fetch('https://localhost:44301/api/Movie_Cast/GetAllMovieCast');
  const data = await response.json();
  return data;
});

// Create an async thunk for inserting movie cast
export const insertMovieCast = createAsyncThunk('global/insertMovieCast', async (movieCast) => {
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

// Create an async thunk for updating movie cast
export const updateMovieCast = createAsyncThunk('global/updateMovieCast', async (movieCast) => {
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

// Create an async thunk for deleting movie cast
export const deleteMovieCast = createAsyncThunk('global/deleteMovieCast', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Movie_Cast/DeleteMovieCast?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for fetching all movie genres
export const fetchMovieGenres = createAsyncThunk('global/fetchMovieGenres', async () => {
  const response = await fetch('https://localhost:44301/api/Movie_Genres/GetAllMovie_Genres');
  const data = await response.json();
  return data;
});

// Create an async thunk for inserting movie genres
export const insertMovieGenres = createAsyncThunk('global/insertMovieGenres', async (movieGenres) => {
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

// Create an async thunk for updating movie genres
export const updateMovieGenres = createAsyncThunk('global/updateMovieGenres', async (movieGenres) => {
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

// Create an async thunk for deleting movie genres
export const deleteMovieGenres = createAsyncThunk('global/deleteMovieGenres', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Movie_Genres/DeleteMovieGenres?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for fetching all movie direction
export const fetchMovieDirection = createAsyncThunk('global/fetchMovieDirection', async () => {
  const response = await fetch('https://localhost:44301/api/MovieDirection/GetAllMovieDirection');
  const data = await response.json();
  return data;
});

// Create an async thunk for inserting movie direction
export const insertMovieDirection = createAsyncThunk('global/insertMovieDirection', async (movieDirection) => {
  const response = await fetch('https://localhost:44301/api/MovieDirection/InsertDirection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieDirection),
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for updating movie direction
export const updateMovieDirection = createAsyncThunk('global/updateMovieDirection', async (movieDirection) => {
  const response = await fetch('https://localhost:44301/api/MovieDirection/UpdateDirection', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieDirection),
  });
  const data = await response.json();
  return data;
});

// Create an async thunk for deleting movie direction
export const deleteMovieDirection = createAsyncThunk('global/deleteMovieDirection', async (id) => {
  const response = await fetch(`https://localhost:44301/api/MovieDirection/DeleteDirection?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create the global slice
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.status = 'succeeded';
      })
      .addCase(insertGenres.fulfilled, (state, action) => {
        state.genres.push(action.payload);
      })
      .addCase(updateGenres.fulfilled, (state, action) => {
        const { id, ...updatedGenre } = action.payload;
        const existingGenre = state.genres.find((genre) => genre.id === id);
        if (existingGenre) {
          Object.assign(existingGenre, updatedGenre);
        }
      })
      .addCase(deleteGenres.fulfilled, (state, action) => {
        state.genres = state.genres.filter((genre) => genre.id !== action.payload.id);
      })

      // Handling Movie Cast
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.movieCast = action.payload;
        state.status = 'succeeded';
      })
      .addCase(insertMovieCast.fulfilled, (state, action) => {
        state.movieCast.push(action.payload);
      })
      .addCase(updateMovieCast.fulfilled, (state, action) => {
        const { id, ...updatedMovieCast } = action.payload;
        const existingMovieCast = state.movieCast.find((movieCast) => movieCast.id === id);
        if (existingMovieCast) {
          Object.assign(existingMovieCast, updatedMovieCast);
        }
      })
      .addCase(deleteMovieCast.fulfilled, (state, action) => {
        state.movieCast = state.movieCast.filter((movieCast) => movieCast.id !== action.payload.id);
      })

      // Handling Movie Genres
      .addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.movieGenres = action.payload;
        state.status = 'succeeded';
      })
      .addCase(insertMovieGenres.fulfilled, (state, action) => {
        state.movieGenres.push(action.payload);
      })
      .addCase(updateMovieGenres.fulfilled, (state, action) => {
        const { id, ...updatedMovieGenres } = action.payload;
        const existingMovieGenres = state.movieGenres.find((movieGenres) => movieGenres.id === id);
        if (existingMovieGenres) {
          Object.assign(existingMovieGenres, updatedMovieGenres);
        }
      })
      .addCase(deleteMovieGenres.fulfilled, (state, action) => {
        state.movieGenres = state.movieGenres.filter((movieGenres) => movieGenres.id !== action.payload.id);
      })

      // Handling Movie Direction
      .addCase(fetchMovieDirection.fulfilled, (state, action) => {
        state.movieDirection = action.payload;
        state.status = 'succeeded';
      })
      .addCase(insertMovieDirection.fulfilled, (state, action) => {
        state.movieDirection.push(action.payload);
      })
      .addCase(updateMovieDirection.fulfilled, (state, action) => {
        const { id, ...updatedMovieDirection } = action.payload;
        const existingMovieDirection = state.movieDirection.find((movieDirection) => movieDirection.id === id);
        if (existingMovieDirection) {
          Object.assign(existingMovieDirection, updatedMovieDirection);
        }
      })
      .addCase(deleteMovieDirection.fulfilled, (state, action) => {
        state.movieDirection = state.movieDirection.filter((movieDirection) => movieDirection.id !== action.payload.id);
      });
  },
});

export default globalSlice.reducer;
