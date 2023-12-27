// ReviewerComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReviewers,
  insertReviewer,
  updateReviewer,
  deleteReviewer,
} from './ReviewerSlice';
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

const ReviewerComponent = () => {
  const dispatch = useDispatch();
  const { reviewers, status, error } = useSelector((state) => state.reviewers);
  const [editMode, setEditMode] = useState(null);
  const [newReviewer, setNewReviewer] = useState({
    rev_name: '',
    rev_dob: '',
    rev_address: '',
    rev_country: '',
    rev_state: '',
    rev_city: '',
    rev_pincode: 0,
    rev_phone_no: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewers());
  }, [dispatch]);

  const handleSave = () => {
    if (editMode) {
      dispatch(updateReviewer({ id: editMode, ...newReviewer }));
    } else {
      dispatch(insertReviewer(newReviewer));
    }
    setNewReviewer({
      rev_name: '',
      rev_dob: '',
      rev_address: '',
      rev_country: '',
      rev_state: '',
      rev_city: '',
      rev_pincode: 0,
      rev_phone_no: '',
    });
    setEditMode(null);
    setOpenDialog(false);
  };

  const handleEdit = (id, reviewer) => {
    setEditMode(id);
    setNewReviewer(reviewer);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteReviewer(id));
  };

  const handleCloseDialog = () => {
    setEditMode(null);
    setNewReviewer({
      rev_name: '',
      rev_dob: '',
      rev_address: '',
      rev_country: '',
      rev_state: '',
      rev_city: '',
      rev_pincode: 0,
      rev_phone_no: '',
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
            <TableRow style={{ backgroundColor: 'navy', color: 'white' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Country</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>State</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>City</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Pincode</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Phone No</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewers.map((reviewer) => (
              <TableRow key={reviewer.id} style={{ backgroundColor: 'lightgreen' }}>
                <TableCell>{reviewer.rev_name}</TableCell>
                <TableCell>{reviewer.rev_dob}</TableCell>
                <TableCell>{reviewer.rev_address}</TableCell>
                <TableCell>{reviewer.rev_country}</TableCell>
                <TableCell>{reviewer.rev_state}</TableCell>
                <TableCell>{reviewer.rev_city}</TableCell>
                <TableCell>{reviewer.rev_pincode}</TableCell>
                <TableCell>{reviewer.rev_phone_no}</TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => handleEdit(reviewer.id, reviewer)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(reviewer.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Reviewer' : 'Add Reviewer'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newReviewer.rev_name}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={newReviewer.rev_dob.split('T')[0]}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_dob: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Address"
            value={newReviewer.rev_address}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_address: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Country"
            value={newReviewer.rev_country}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_country: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="State"
            value={newReviewer.rev_state}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_state: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="City"
            value={newReviewer.rev_city}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_city: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Pincode"
            type="number"
            value={newReviewer.rev_pincode}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_pincode: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Phone No"
            value={newReviewer.rev_phone_no}
            onChange={(e) => setNewReviewer({ ...newReviewer, rev_phone_no: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? 'Save Changes' : 'Add Reviewer'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewerComponent;
