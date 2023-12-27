// DirectorComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDirectors,
  insertDirector,
  updateDirector,
  deleteDirector,
} from './DirectorSlice';
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

const DirectorComponent = () => {
  const dispatch = useDispatch();
  const { directors, status, error } = useSelector((state) => state.directors);
  const [editMode, setEditMode] = useState(null);
  const [newDirector, setNewDirector] = useState({
    dir_firstname: '',
    dir_lastname: '',
    dir_dob: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);

  const handleSave = () => {
    if (editMode) {
      dispatch(updateDirector({ id: editMode, ...newDirector }));
    } else {
      dispatch(insertDirector(newDirector));
    }
    setNewDirector({
      dir_firstname: '',
      dir_lastname: '',
      dir_dob: '',
    });
    setEditMode(null);
    setOpenDialog(false);
  };

  const handleEdit = (id, director) => {
    setEditMode(id);
    setNewDirector(director);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteDirector(id));
  };

  const handleCloseDialog = () => {
    setEditMode(null);
    setNewDirector({
      dir_firstname: '',
      dir_lastname: '',
      dir_dob: '',
    });
    setOpenDialog(false);
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
            <TableRow style={{ backgroundColor: '#F3E5F5', color: 'white' }}>
              <TableCell style={{ color: 'black', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell style={{ color: 'black', fontWeight: 'bold' }}>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directors.map((director) => (
              <TableRow key={director.id} style={{ backgroundColor: '#C8E6C9', color: 'black' }}>
                <TableCell>{director.dir_firstname}</TableCell>
                <TableCell>{director.dir_lastname}</TableCell>
                <TableCell>{director.dir_dob.split('T')[0]}</TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => handleEdit(director.id, director)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(director.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Director' : 'Add Director'}</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={newDirector.dir_firstname}
            onChange={(e) =>
              setNewDirector({ ...newDirector, dir_firstname: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            value={newDirector.dir_lastname}
            onChange={(e) =>
              setNewDirector({ ...newDirector, dir_lastname: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={newDirector.dir_dob.split('T')[0]}
            onChange={(e) =>
              setNewDirector({ ...newDirector, dir_dob: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? 'Save Changes' : 'Add Director'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DirectorComponent;
