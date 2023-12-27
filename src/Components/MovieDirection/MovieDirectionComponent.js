// MovieDirectionComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieDirection,
  insertMovieDirection,
  updateMovieDirection,
  deleteMovieDirection,
} from './MovieDirectionSlice';

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

const MovieDirectionComponent = () => {
  const dispatch = useDispatch();
  const { movieDirection, status, error } = useSelector((state) => state.movieDirection);

  const [editMovieDirectionMode, setEditMovieDirectionMode] = useState(null);
  const [newMovieDirection, setNewMovieDirection] = useState({
    id: 0,
    dir_firstname: '',
    mov_title: '',
  });
  const [openMovieDirectionDialog, setOpenMovieDirectionDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDirection());
  }, [dispatch]);

  const handleMovieDirectionSave = () => {
    if (editMovieDirectionMode) {
      dispatch(updateMovieDirection(newMovieDirection));
    } else {
      dispatch(insertMovieDirection(newMovieDirection));
    }
    setNewMovieDirection({
      id: 0,
      dir_firstname: '',
      mov_title: '',
    });
    setEditMovieDirectionMode(null);
    setOpenMovieDirectionDialog(false);
  };

  const handleMovieDirectionEdit = (id, movieDirection) => {
    setEditMovieDirectionMode(id);
    setNewMovieDirection(movieDirection);
    setOpenMovieDirectionDialog(true);
  };

  const handleCloseMovieDirectionDialog = () => {
    setEditMovieDirectionMode(null);
    setNewMovieDirection({
      id: 0,
      dir_firstname: '',
      mov_title: '',
    });
    setOpenMovieDirectionDialog(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!movieDirection) {
    return <div>Data not available.</div>;
  }

  return (
    <div style={{ marginTop: '70px' }}>
      {/* MovieDirection Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'green', color: 'white' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Director Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Movie Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                <IconButton
                  color="primary"
                  onClick={() => setOpenMovieDirectionDialog(true)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieDirection.map((direction) => (
              <TableRow key={direction.id} style={{ backgroundColor: '#d2b4de' }}>
                <TableCell>{direction.dir_firstname}</TableCell>
                <TableCell>{direction.mov_title}</TableCell>
                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => handleMovieDirectionEdit(direction.id, direction)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteMovieDirection(direction.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MovieDirection Dialog */}
      <Dialog open={openMovieDirectionDialog} onClose={handleCloseMovieDirectionDialog}>
        <DialogTitle>
          {editMovieDirectionMode ? 'Edit MovieDirection' : 'Add MovieDirection'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Director Name"
            value={newMovieDirection.dir_firstname}
            onChange={(e) =>
              setNewMovieDirection({ ...newMovieDirection, dir_firstname: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Movie Name"
            value={newMovieDirection.mov_title}
            onChange={(e) =>
              setNewMovieDirection({ ...newMovieDirection, mov_title: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMovieDirectionDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMovieDirectionSave} color="primary">
            {editMovieDirectionMode ? 'Save Changes' : 'Add MovieDirection'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDirectionComponent;
