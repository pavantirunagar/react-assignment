import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const firstName = profile?.name?.split(' ')[0] ?? '';
  const lastName = profile?.name?.split(' ')[1] ?? '';
  const initials = firstName.charAt(0) + (lastName?.charAt(0) ?? '');

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #006064, #00acc1)',
        boxShadow: '0 4px 15px rgba(0, 96, 100, 0.3)',
        py: 1,
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#e0f7fa',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '0.06em',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
          }}
        >
          Profile App
        </Typography>

        {profile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: '#004d40',
                width: 36,
                height: 36,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {initials.toUpperCase()}
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '1rem',
                letterSpacing: '0.03em',
              }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
