// DirectorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  directors: [],
  status: 'idle',
  error: null,
};

export const fetchDirectors = createAsyncThunk('directors/fetchDirectors', async () => {
  const response = await fetch('https://localhost:44301/api/Director/GetAlldirector');
  const data = await response.json();
  return data;
});

export const insertDirector = createAsyncThunk('directors/insertDirector', async (director) => {
  const response = await fetch('https://localhost:44301/api/Director/Insertdirector', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(director),
  });
  const data = await response.json();
  return data;
});

export const updateDirector = createAsyncThunk('directors/updateDirector', async (director) => {
  const response = await fetch('https://localhost:44301/api/Director/Updatedirector', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(director),
  });
  const data = await response.json();
  return data;
});

export const deleteDirector = createAsyncThunk('directors/deleteDirector', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Director/Deletedirector?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const directorSlice = createSlice({
  name: 'directors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDirectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.directors = action.payload;
      })
      .addCase(fetchDirectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertDirector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.directors.push(action.payload);
      })
      .addCase(updateDirector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedDirectorIndex = state.directors.findIndex(
          (director) => director.id === action.payload.id
        );
        state.directors[updatedDirectorIndex] = action.payload;
      })
      .addCase(deleteDirector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.directors = state.directors.filter((director) => director.id !== action.payload.id);
      });
  },
});

export default directorSlice.reducer;

