// MovieGenresComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieGenres,
  insertMovieGenres,
  updateMovieGenres,
  deleteMovieGenres,
} from './MovieGenresSlice';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const MovieGenresComponent = () => {
  const dispatch = useDispatch();
  const { movieGenres, status, error } = useSelector((state) => state.movieGenres);

  const [editMovieGenresMode, setEditMovieGenresMode] = useState(null);
  const [newMovieGenres, setNewMovieGenres] = useState({
    id: 0,
    movie_name: '',
    gen_title: '',
  });
  const [openMovieGenresDialog, setOpenMovieGenresDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  const handleMovieGenresSave = () => {
    if (editMovieGenresMode) {
      dispatch(updateMovieGenres(newMovieGenres));
    } else {
      dispatch(insertMovieGenres(newMovieGenres));
    }
    setNewMovieGenres({
      id: 0,
      movie_name: '',
      gen_title: '',
    });
    setEditMovieGenresMode(null);
    setOpenMovieGenresDialog(false);
  };

  const handleMovieGenresEdit = (id, movieGenres) => {
    setEditMovieGenresMode(id);
    setNewMovieGenres(movieGenres);
    setOpenMovieGenresDialog(true);
  };

  const handleCloseMovieGenresDialog = () => {
    setEditMovieGenresMode(null);
    setNewMovieGenres({
      id: 0,
      movie_name: '',
      gen_title: '',
    });
    setOpenMovieGenresDialog(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!movieGenres) {
    return <div>Data not available.</div>;
  }

  return (
    <div style={{ marginTop: '70px' }}>
      {/* MovieGenres Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'yellow', color: 'white' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Movie Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Genres</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                <IconButton
                  color="primary"
                  onClick={() => setOpenMovieGenresDialog(true)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieGenres.map((movieGenre) => (
              <TableRow key={movieGenre.id} style={{ backgroundColor: '#d2b4de' }}>
                <TableCell>{movieGenre.mov_title}</TableCell>
                <TableCell>{movieGenre.gen_title}</TableCell>
                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => handleMovieGenresEdit(movieGenre.id, movieGenre)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteMovieGenres(movieGenre.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MovieGenres Dialog */}
      <Dialog open={openMovieGenresDialog} onClose={handleCloseMovieGenresDialog}>
        <DialogTitle>
          {editMovieGenresMode ? 'Edit MovieGenres' : 'Add MovieGenres'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Movie Name"
            value={newMovieGenres.movie_name}
            onChange={(e) =>
              setNewMovieGenres({ ...newMovieGenres, movie_name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Genre Name"
            value={newMovieGenres.gen_title}
            onChange={(e) =>
              setNewMovieGenres({ ...newMovieGenres, gen_title: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMovieGenresDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMovieGenresSave} color="primary">
            {editMovieGenresMode ? 'Save Changes' : 'Add MovieGenres'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieGenresComponent;
