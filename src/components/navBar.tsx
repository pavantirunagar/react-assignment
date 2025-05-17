import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const firstName = profile?.name?.split(' ')[0] ?? '';
  const lastName = profile?.name?.split(' ')[1] ?? '';

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', 
        py: 1 
      }}
      className="border-b border-blue-200"
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: 'white', 
            letterSpacing: '0.5px' 
          }}
          className="tracking-wide"
        >
          Profile App
        </Typography>
        {profile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 500, 
                color: 'white', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                px: 2, 
                py: 0.5, 
                borderRadius: 2, 
                transition: 'background-color 0.2s' 
              }}
              className="hover:bg-blue-100/20"
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