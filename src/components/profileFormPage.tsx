import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProfileFormFields from './ProfileFormFields';
import { useProfileFunctions } from './useProfileFunctions';

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
        bgcolor: '#f7fafc',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-4px)' },
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: '#1a3c34',
            textAlign: 'center',
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
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;

