import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProfileFormFields from './ProfileFormFields';
import { useProfileFunctions } from '../hooks/useProfileFunctions';

const ProfileForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    formData,
    message,
    messageType,
    openSnackbar,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
    loading,
    errors,
  } = useProfileFunctions({ id, isEditMode });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'linear-gradient(135deg, #f3e8ff 0%, #ffe0cc 100%)',
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 540,
          width: '100%',
          p: { xs: 4, sm: 6 },
          background: 'white',
          borderRadius: 5,
          boxShadow:
            '0 10px 30px rgba(107, 33, 168, 0.1), 0 6px 24px rgba(218, 122, 53, 0.15)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.015)',
            boxShadow:
              '0 16px 50px rgba(107, 33, 168, 0.25), 0 10px 30px rgba(218, 122, 53, 0.25)',
          },
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 6,
            fontWeight: 800,
            color: '#6b21a8',
            textAlign: 'center',
            letterSpacing: '0.05em',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textShadow: '1px 1px 4px rgba(107, 33, 168, 0.2)',
          }}
        >
          {isEditMode ? 'Edit Your Profile' : 'Create Your Profile'}
        </Typography>

        <ProfileFormFields
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
          message={message}
          messageType={messageType}
          loading={loading}
          errors={errors}
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 3 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageType}
          sx={{
            width: '100%',
            fontWeight: 600,
            fontSize: '1.05rem',
            borderRadius: 2,
            backgroundColor:
              messageType === 'success' ? '#9333ea' : '#e53935',
            color: 'white',
            boxShadow:
              messageType === 'success'
                ? '0 4px 20px rgba(147, 51, 234, 0.4)'
                : '0 4px 20px rgba(229, 57, 53, 0.4)',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
