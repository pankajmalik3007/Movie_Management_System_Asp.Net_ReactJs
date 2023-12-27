// ReviewerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  reviewers: [],
  status: 'idle',
  error: null,
};

export const fetchReviewers = createAsyncThunk('reviewers/fetchReviewers', async () => {
  const response = await fetch('https://localhost:44301/api/Reviewer/GetAllReviewer');
  const data = await response.json();
  return data;
});

export const insertReviewer = createAsyncThunk('reviewers/insertReviewer', async (reviewer) => {
  const response = await fetch('https://localhost:44301/api/Reviewer/InsertReviewer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewer),
  });
  const data = await response.json();
  return data;
});

export const updateReviewer = createAsyncThunk('reviewers/updateReviewer', async (reviewer) => {
  const response = await fetch('https://localhost:44301/api/Reviewer/UpdateReviewer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewer),
  });
  const data = await response.json();
  return data;
});

export const deleteReviewer = createAsyncThunk('reviewers/deleteReviewer', async (id) => {
  const response = await fetch(`https://localhost:44301/api/Reviewer/DeleteReviewer?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const reviewerSlice = createSlice({
  name: 'reviewers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviewers = action.payload;
      })
      .addCase(fetchReviewers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviewers.push(action.payload);
      })
      .addCase(updateReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedReviewerIndex = state.reviewers.findIndex(
          (reviewer) => reviewer.id === action.payload.id
        );
        state.reviewers[updatedReviewerIndex] = action.payload;
      })
      .addCase(deleteReviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviewers = state.reviewers.filter((reviewer) => reviewer.id !== action.payload.id);
      });
  },
});

export default reviewerSlice.reducer;

