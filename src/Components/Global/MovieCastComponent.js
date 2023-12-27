// MovieCastComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieCasts,
  insertMovieCast,
  updateMovieCast,
  deleteMovieCast,
} from './MovieCastSlice';

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

const MovieCastComponent = () => {
  const dispatch = useDispatch();
  const { movieCasts, status, error } = useSelector((state) => state.movieCasts);

  const [editMovieCastMode, setEditMovieCastMode] = useState(null);
  const [newMovieCast, setNewMovieCast] = useState({
    act_Name: '', // Adjusted for act_Name instead of movieId
    movie_name: '', // Adjusted for movie_name instead of castId
    role: '', // Adjusted for role instead of id
  });
  const [openMovieCastDialog, setOpenMovieCastDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieCasts());
  }, [dispatch]);

  const handleMovieCastSave = () => {
    if (editMovieCastMode) {
      dispatch(updateMovieCast(newMovieCast));
    } else {
      dispatch(insertMovieCast(newMovieCast));
    }
    setNewMovieCast({
      act_Name: '',
      movie_name: '',
      role: '',
    });
    setEditMovieCastMode(null);
    setOpenMovieCastDialog(false);
  };

  const handleMovieCastEdit = (id, movieCast) => {
    setEditMovieCastMode(id);
    setNewMovieCast(movieCast);
    setOpenMovieCastDialog(true);
  };

  const handleCloseMovieCastDialog = () => {
    setEditMovieCastMode(null);
    setNewMovieCast({
      act_Name: '',
      movie_name: '',
      role: '',
    });
    setOpenMovieCastDialog(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!movieCasts) {
    return <div>Data not available.</div>;
  }

  return (
    <div style={{ marginTop: '70px' }}>
      {/* MovieCast Table */}
      <TableContainer component={Paper} style={{ marginBottom: '100px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'green', color: 'white' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Actor Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Movie Id</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                <IconButton
                  color="primary"
                  onClick={() => setOpenMovieCastDialog(true)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieCasts.map((movieCast) => (
              <TableRow key={movieCast.id} style={{ backgroundColor: '#d2b4de' }}>
                <TableCell>{movieCast.act_firstname}</TableCell>
                <TableCell>{movieCast.mov_title}</TableCell>
                <TableCell>{movieCast.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => handleMovieCastEdit(movieCast.id, movieCast)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteMovieCast(movieCast.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MovieCast Dialog */}
      <Dialog open={openMovieCastDialog} onClose={handleCloseMovieCastDialog}>
        <DialogTitle>
          {editMovieCastMode ? 'Edit MovieCast' : 'Add MovieCast'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Act Name"
            value={newMovieCast.act_Name}
            onChange={(e) =>
              setNewMovieCast({ ...newMovieCast, act_Name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Movie Name"
            value={newMovieCast.movie_name}
            onChange={(e) =>
              setNewMovieCast({ ...newMovieCast, movie_name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role"
            value={newMovieCast.role}
            onChange={(e) =>
              setNewMovieCast({ ...newMovieCast, role: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMovieCastDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMovieCastSave} color="primary">
            {editMovieCastMode ? 'Save Changes' : 'Add MovieCast'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCastComponent;
