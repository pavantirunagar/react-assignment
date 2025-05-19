import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { useState } from 'react';
import NoProfileFound from './noProfileFound';
import { clearProfile, deleteProfileThunk } from '../redux/profileSlice';

const ProfilePage = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDelete = async () => {
    if (!profile?.id) return;
    await dispatch(deleteProfileThunk(profile.id) as any);
    setOpenDialog(false);
    dispatch(clearProfile());
  };

  if (!profile) {
    return <NoProfileFound />;
  }

  return (
    <Box
      sx={{
        maxWidth: 640,
        mx: 'auto',
        mt: 6,
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        bgcolor: 'background.paper',
        boxShadow: 6,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#6b21a8',
          textAlign: 'center',
          mb: 1,
        }}
      >
        Your Profile
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        Review or update your details
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Full Name
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {profile.name}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Email Address
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {profile.email}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Age
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {profile.age ?? 'N/A'}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        mt={4}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/profile-form/${profile.id}`)}
          sx={{
    background: 'linear-gradient(90deg, #006064, #00acc1)',
            color: 'white',
            fontWeight: 600,
            px: 4,
            py: 1.2,
            borderRadius: 2,
            width: isMobile ? '100%' : 'auto',
            '&:hover': {
    background: 'linear-gradient(90deg, #00acc1,  #006064,)',
            },
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenDialog(true)}
          sx={{
            px: 4,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 2,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Delete Profile
        </Button>
      </Stack>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Are you sure you want to delete this profile? This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
