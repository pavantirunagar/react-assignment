import React from 'react';
import { Stack, TextField, Typography, Box } from '@mui/material';
import type { Profile } from '../types/profileTypes';
import { LoadingButton } from '@mui/lab';

interface Props {
  formData: Profile;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
  message: string;
  messageType: 'success' | 'error' | '' | undefined;
  loading: boolean;
  errors: {
    name?: string;
    email?: string;
    age?: string;
  };
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)
  ) {
    return;
  }

  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
    return;
  }

  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};

const ProfileFormFields: React.FC<Props> = ({
  formData,
  onChange,
  onSubmit,
  isEditMode,
  message,
  messageType,
  loading,
  errors,
}) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    noValidate
    sx={{
      maxWidth: 400,
      mx: 'auto',
      mt: 4,
      p: 3,
      backgroundColor: '#f9fafb',
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Stack spacing={3}>
      <TextField
        name="name"
        label="Name"
        required
        fullWidth
        value={formData.name}
        onChange={onChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        autoComplete="name"
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        fullWidth
        value={formData.email}
        onChange={onChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        autoComplete="email"
      />
      <TextField
        name="age"
        label="Age"
        type="text"
        fullWidth
        value={formData.age ?? ''}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        error={Boolean(errors.age)}
        helperText={errors.age}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      />

      <LoadingButton
       type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
  sx={{
    mt: 4,
    background: 'linear-gradient(90deg, #006064, #00acc1)',
    color: 'white',
    fontWeight: 600,
    fontSize: '1rem',
    borderRadius: 2,
    px: 4,
    py: 1.2,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(0, 105, 120, 0.3)',
    transition: '0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #004d40, #00838f)',
      boxShadow: '0 6px 18px rgba(0, 96, 100, 0.4)',
    },
  }}
      >
        {isEditMode ? 'Update Profile' : 'Create Profile'}
      </LoadingButton>

      {message && (
        <Typography
          variant="body2"
          align="center"
          mt={1}
          color={messageType === 'success' ? 'success.main' : 'error.main'}
          sx={{ fontWeight: 600 }}
        >
          {message}
        </Typography>
      )}
    </Stack>
  </Box>
);

export default ProfileFormFields;
