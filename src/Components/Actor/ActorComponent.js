// ActorComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActors,
  insertActor,
  updateActor,
  deleteActor,
} from './ActorSlice';
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

const ActorComponent = () => {
  const dispatch = useDispatch();
  const { actors, status, error } = useSelector((state) => state.actors);
  const [editMode, setEditMode] = useState(null);
  const [newActor, setNewActor] = useState({
    act_firstname: '',
    act_lastname: '',
    act_gender: '',
    act_dob: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  const handleSave = () => {
    if (editMode) {
      dispatch(updateActor({ id: editMode, ...newActor }));
    } else {
      dispatch(insertActor(newActor));
    }
    setNewActor({
      act_firstname: '',
      act_lastname: '',
      act_gender: '',
      act_dob: '',
    });
    setEditMode(null);
    setOpenDialog(false);
  };

  const handleEdit = (id, actor) => {
    setEditMode(id);
    setNewActor(actor);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteActor(id));
  };

  const handleCloseDialog = () => {
    setEditMode(null);
    setNewActor({
      act_firstname: '',
      act_lastname: '',
      act_gender: '',
      act_dob: '',
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
          <TableRow style={{ backgroundColor: '#FFEB3B', color: 'white' }}>
              <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actors.map((actor) => (
              <TableRow key={actor.id} style={{ backgroundColor: '#C8E6C9', color: 'white' }}>
                <TableCell>{actor.act_firstname}</TableCell>
                <TableCell>{actor.act_lastname}</TableCell>
                <TableCell>{actor.act_gender}</TableCell>
                <TableCell>{actor.act_dob.split('T')[0]}</TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => handleEdit(actor.id, actor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(actor.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Actor' : 'Add Actor'}</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={newActor.act_firstname}
            onChange={(e) => setNewActor({ ...newActor, act_firstname: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            value={newActor.act_lastname}
            onChange={(e) => setNewActor({ ...newActor, act_lastname: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Gender"
            value={newActor.act_gender}
            onChange={(e) => setNewActor({ ...newActor, act_gender: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={newActor.act_dob.split('T')[0]}
            onChange={(e) => setNewActor({ ...newActor, act_dob: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? 'Save Changes' : 'Add Actor'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActorComponent;
