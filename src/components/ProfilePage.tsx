import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { deleteProfile } from '../redux/profileSlice';
import { useState } from 'react';
import NoProfileFound from './noProfileFound';

const ProfilePage = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    dispatch(deleteProfile());
    setOpenDialog(false);
  };

  if (!profile) {
    return <NoProfileFound/>
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Profile Details</Typography>
      <Typography>Name: {profile.name}</Typography>
      <Typography>Email: {profile.email}</Typography>
      <Typography>Age: {profile.age ?? 'N/A'}</Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="outlined" onClick={() => navigate(`/profile-form/${profile.id}`)}>Edit</Button>
        <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>Delete</Button>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Alert severity="warning">Are you sure you want to delete this profile? </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
