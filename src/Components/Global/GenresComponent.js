// GenresComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGenres,
  insertGenres,
  updateGenres,
  deleteGenres,
} from './GlobalSlice';
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

const GenresComponent = () => {
  const dispatch = useDispatch();
  const { genres, status, error } = useSelector((state) => state.genres);

  const [editGenresMode, setEditGenresMode] = useState(null);
  const [newGenres, setNewGenres] = useState({
    id: 0,
    gen_title: '',
  });
  const [openGenresDialog, setOpenGenresDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenresSave = () => {
    if (editGenresMode) {
      dispatch(updateGenres(newGenres));
    } else {
      dispatch(insertGenres(newGenres));
    }
    setNewGenres({
      id: 0,
      gen_title: '',
    });
    setEditGenresMode(null);
    setOpenGenresDialog(false);
  };

  const handleGenresEdit = (id, genre) => {
    setEditGenresMode(id);
    setNewGenres(genre);
    setOpenGenresDialog(true);
  };

  const handleCloseGenresDialog = () => {
    setEditGenresMode(null);
    setNewGenres({
      id: 0,
      gen_title: '',
    });
    setOpenGenresDialog(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!genres) {
    return <div>Data not available.</div>;
  }

  return (
    <div style={{ marginTop: '70px' }}>
      {/* Genres Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: 'pink', color: 'white' }}>
           
              <TableCell style={{ fontWeight: 'bold' }}>Genre Title</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                <IconButton color="primary" onClick={() => setOpenGenresDialog(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre) => (
              <TableRow key={genre.id} style={{ backgroundColor: '#d2b4de' }}>
                
                <TableCell>{genre.gen_title}</TableCell>
                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => handleGenresEdit(genre.id, genre)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteGenres(genre.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Genres Dialog */}
      <Dialog open={openGenresDialog} onClose={handleCloseGenresDialog}>
        <DialogTitle>{editGenresMode ? 'Edit Genre' : 'Add Genre'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Genre Title"
            value={newGenres.gen_title}
            onChange={(e) => setNewGenres({ ...newGenres, gen_title: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenresDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGenresSave} color="primary">
            {editGenresMode ? 'Save Changes' : 'Add Genre'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GenresComponent;
