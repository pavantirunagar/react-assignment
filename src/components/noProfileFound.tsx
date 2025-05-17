import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoProfileFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 6, p: 3, bgcolor: '#f0f4f8', borderRadius: 2, maxWidth: 400, mx: 'auto' }}
    >
      <Typography variant="h6" color="text.secondary" textAlign="center">
        No profile found. Please create one.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/profile-form')}
        sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
      >
        Create Profile
      </Button>
    </Stack>
  );
};

export default NoProfileFound;
