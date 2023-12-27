import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovieDirection = createAsyncThunk('global/fetchMovieDirection', async () => {
  const response = await fetch('https://localhost:44301/api/MovieDirection/GetAllMovieDirection');
  const data = await response.json();
  return data;
});

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

export const deleteMovieDirection = createAsyncThunk('global/deleteMovieDirection', async (id) => {
  const response = await fetch(`https://localhost:44301/api/MovieDirection/DeleteDirection?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const movieDirectionSlice = createSlice({
  name: 'movieDirection',
  initialState: {
    movieDirection: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDirection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDirection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieDirection = action.payload;
      })
      .addCase(fetchMovieDirection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertMovieDirection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieDirection.push(action.payload);
      })
      .addCase(updateMovieDirection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedDirection = action.payload;
        const existingDirectionIndex = state.movieDirection.findIndex((d) => d.id === updatedDirection.id);
        if (existingDirectionIndex !== -1) {
          state.movieDirection[existingDirectionIndex] = updatedDirection;
        }
      })
      .addCase(deleteMovieDirection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedDirectionId = action.payload;
        state.movieDirection = state.movieDirection.filter((d) => d.id !== deletedDirectionId);
      });
  },
});

export default movieDirectionSlice.reducer;
