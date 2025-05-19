import { Typography, Button, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoProfileFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 8,
        mx: 'auto',
        maxWidth: 500,
        p: 4,
        borderRadius: 3,
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Stack spacing={3} alignItems="center" justifyContent="center">
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#4c1d95' }}>
          No Profile Found
        </Typography>
        <Typography color="text.secondary">
          You haven’t created a profile yet. Let’s get started!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/profile-form')}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
    background: 'linear-gradient(90deg, #006064, #00acc1)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(90deg, #7e22ce, #ea580c)',
            },
          }}
        >
          Create Profile
        </Button>
      </Stack>
    </Box>
  );
};

export default NoProfileFound;
