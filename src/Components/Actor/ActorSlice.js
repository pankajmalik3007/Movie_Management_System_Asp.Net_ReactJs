
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  actors: [],
  status: 'idle',
  error: null,
};


export const fetchActors = createAsyncThunk('actors/fetchActors', async () => {
  const response = await fetch('https://localhost:44301/api/Actor/GetAllActor');
  const data = await response.json();
  return data;
});


export const insertActor = createAsyncThunk('actors/insertActor', async (actor) => {
  const response = await fetch('https://localhost:44301/api/Actor/InsertActor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actor),
  });
  const data = await response.json();
  return data;
});


export const updateActor = createAsyncThunk('actors/updateActor', async (actor) => {
  const response = await fetch('https://localhost:44301/api/Actor/UpdateActor', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actor),
  });
  const data = await response.json();
  return data;
});


export const deleteActor = createAsyncThunk('actors/deleteActor', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Actor/DeleteActor?Id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

// Create the actor slice
const actorSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors.push(action.payload);
      })
      .addCase(updateActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedActorIndex = state.actors.findIndex((actor) => actor.id === action.payload.id);
        state.actors[updatedActorIndex] = action.payload;
      })
      .addCase(deleteActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors = state.actors.filter((actor) => actor.id !== action.payload.id);
      });
  },
});

export default actorSlice.reducer;

