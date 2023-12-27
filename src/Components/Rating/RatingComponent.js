
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRatings,
  insertRating,
  selectRatings,
  selectRatingsStatus,
} from './RatingSlice';
import { Rating, Modal, Box, Button, TextField } from '@mui/material';


const RatingComponent = ({ movieTitle }) => {
  const dispatch = useDispatch();
  const ratings = useSelector(selectRatings);
  const status = useSelector(selectRatingsStatus);
  const [revName, setRevName] = useState('');
  const [revStars, setRevStars] = useState(0);
  const [movTitle, setMovTitle] = useState(movieTitle);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('Ratings:', ratings);
    console.log('Status:', status);
  }, [ratings, status]);

  const handleInsertRating = async () => {
    const ratingInput = {
      movTitle: movTitle,
      revName: revName,
      revStars: revStars,
    };

    try {
      await dispatch(insertRating(ratingInput));
      console.log('Rating inserted successfully');

      // Fetch all ratings to update the local state
      dispatch(fetchRatings());

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error inserting rating:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      <h2>Ratings for {movTitle}</h2>
      <Button variant="contained" onClick={handleOpenModal}>
        Add Your Rating
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <h3>Add Your Rating</h3>
          <div>
            <TextField
              label="Movie Title"
              value={movTitle}
              onChange={(e) => setMovTitle(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Reviewer Name"
              value={revName}
              onChange={(e) => setRevName(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <Rating
              name="stars"
              value={revStars}
              onChange={(event, newValue) => setRevStars(newValue)}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleInsertRating}>
              Submit Rating
            </Button>
          </div>
        </Box>
      </Modal>
  </div>
  );
};

export default RatingComponent;
