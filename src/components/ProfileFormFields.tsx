import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import type { Profile } from '../types/profileTypes';

interface Props {
  formData: Profile;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
  message: string;
  messageType: 'success' | 'error' | '';
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
  <form onSubmit={onSubmit} noValidate>
    <Stack spacing={2} mt={2}>
      <TextField
        name="name"
        label="Name"
        required
        value={formData.name}
        onChange={onChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        value={formData.email}
        onChange={onChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        name="age"
        label="Age"
        type="text"
        value={formData.age ?? ''}
        onChange={onChange}
          onKeyDown={handleKeyDown}

        error={Boolean(errors.age)}
        helperText={errors.age}
        
      />
      <Button type="submit" variant="contained" disabled={loading} loading={loading}>
        {isEditMode ? 'Update' : 'Submit'}
      </Button>
    </Stack>
    {message && (
      <Typography
        mt={2}
        color={messageType === 'success' ? 'green' : 'error'}
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    )}
  </form>
);

export default ProfileFormFields;
