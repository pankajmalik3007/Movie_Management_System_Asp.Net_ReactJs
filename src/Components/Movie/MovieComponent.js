import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TheatersIcon from '@mui/icons-material/Theaters';
import { fetchMovies, insertMovie, updateMovie, deleteMovie } from './MovieSlice';
import RatingComponent from '../Rating/RatingComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const MovieTable = () => {
  const dispatch = useDispatch();
  const { movieList, status, error } = useSelector((state) => state.movies);
  const [editMode, setEditMode] = useState(null);
  const [newMovie, setNewMovie] = useState({
    mov_title: '',
    mov_year: '',
    mov_time: '',
    mov_language: '',
    mov_dt_rel: '',
    mov_rel_country: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSave = async () => {
    if (editMode) {
      await dispatch(updateMovie({ id: editMode, updatedMovie: newMovie }));
    } else {
      await dispatch(insertMovie(newMovie));
    }

   
    dispatch(fetchMovies());

    setNewMovie({
      mov_title: '',
      mov_year: '',
      mov_time: '',
      mov_language: '',
      mov_dt_rel: '',
      mov_rel_country: '',
    });
    setEditMode(null);
    setOpenDialog(false);
  };

  const handleEdit = (id, movie) => {
    setEditMode(id);
    setNewMovie(movie);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id));

    
    dispatch(fetchMovies());
  };

  const handleCloseDialog = () => {
    setEditMode(null);
    setNewMovie({
      mov_title: '',
      mov_year: '',
      mov_time: '',
      mov_language: '',
      mov_dt_rel: '',
      mov_rel_country: '',
    });
    setOpenDialog(false);
  };

  const handleAddRating = (movie) => {
    setSelectedMovie(movie);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const handleSubmitRating = () => {
    console.log(`Submitting rating ${ratingValue} for movie ${selectedMovie.mov_title}`);
    setIsRatingModalOpen(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: '70px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'black' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Year</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Language</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Release Date</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Release Country</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <TheatersIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieList.map((movie) => (
              <TableRow key={movie.id} style={{ backgroundColor: '#d2b4de' }}>
                  <TableCell>{movie.mov_title}</TableCell>
                  <TableCell>{movie.mov_year}</TableCell>
                  <TableCell>{movie.mov_time}</TableCell>
                  <TableCell>{movie.mov_language}</TableCell>
                  <TableCell>{movie.mov_dt_rel}</TableCell>
                  <TableCell>{movie.mov_rel_country}</TableCell>
                <TableCell>{movie.num_of_rating}</TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => handleEdit(movie.id, movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(movie.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button variant="contained" onClick={() => handleAddRating(movie)}>
                    Add Rating
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
        <DialogContent>
        <TextField
            label="Title"
            value={newMovie.mov_title}
            onChange={(e) =>
              setNewMovie({ ...newMovie, mov_title: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Year"
            value={newMovie.mov_year}
            onChange={(e) =>
              setNewMovie({ ...newMovie, mov_year: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Time"
            value={newMovie.mov_time}
            onChange={(e) =>
              setNewMovie({ ...newMovie, mov_time: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
          label="Language"
          select
          fullWidth
          margin="dense"
          value={newMovie.mov_language}
          onChange={(e) => setNewMovie({ ...newMovie, mov_language: e.target.value })}
        >
          <MenuItem value="Marathi">Marathi</MenuItem>
          <MenuItem value="Hindi">Hindi</MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Tamil">Tamil</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
          <MenuItem value="Japanese">Japanese</MenuItem>
        </TextField>
            <TextField
            label="Release Date"
            type="date"
            value={newMovie.mov_dt_rel.split('T')[0]}
            onChange={(e) =>
              setNewMovie({ ...newMovie, mov_dt_rel: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
          label="Release Country"
          select
          fullWidth
          margin="dense"
          value={newMovie.mov_rel_country}
          onChange={(e) => setNewMovie({ ...newMovie, mov_rel_country: e.target.value })}
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="England">England</MenuItem>
          <MenuItem value="China">China</MenuItem>
          <MenuItem value="Japan">Japan</MenuItem>
        </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  {editMode ? 'Save Changes' : 'Add Movie'}
                </Button>
              </DialogActions>
            </Dialog>


      {selectedMovie && (
        <RatingComponent
          movieTitle={selectedMovie.mov_title}
          open={isRatingModalOpen}
          onClose={handleCloseRatingModal}
          onSubmit={handleSubmitRating}
          value={ratingValue}
          onChange={(value) => setRatingValue(value)}
        />
      )}
    </div>
  );
};

export default MovieTable;
