import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { Profile } from '../types/profileTypes';
import { createProfile, updateProfile, getProfileById } from '../services/profileServices';
import { setProfile } from '../redux/profileSlice';

interface UseProfileFunctionsProps {
  id?: string | undefined;
  isEditMode: boolean;
}

export const useProfileFunctions = ({ id, isEditMode }: UseProfileFunctionsProps) => {
  const [formData, setFormData] = useState<Profile>({ name: '', email: '', age: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; age?: string }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode && id) {
      getProfileById(id).then(data => setFormData(data));
    }
  }, [id, isEditMode]);

 const validateForm = () => {
  const newErrors: { name?: string; email?: string; age?: string } = {};

  if (!formData.name.trim()) newErrors.name = 'Name is required.';
  else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters.';

  if (!formData.email.trim()) newErrors.email = 'Email is required.';
  else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format.';
  }

  if (typeof formData.age === 'string' && formData.age.trim() !== '') {
    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum < 0 || !Number.isInteger(ageNum)) {
      newErrors.age = 'Age must be a valid positive integer.';
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
};


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setLoading(true);
  try {
   const submitData = {
  ...formData,
  age:
    typeof formData.age === 'string' && formData.age.trim() !== ''
      ? Number(formData.age)
      : undefined,
};



    let response;
    if (isEditMode && id) {
      response = await updateProfile(id, submitData);
      setMessage('Profile updated successfully.');
    } else {
      response = await createProfile(submitData);
      setMessage('Profile created successfully.');
    }
    setMessageType('success');
    setOpenSnackbar(true);
    dispatch(setProfile(response));
    setTimeout(() => navigate('/profile'), 1500);
  } catch (err) {
    console.error(err);
    setMessage('Error saving profile.');
    setMessageType('error');
    setOpenSnackbar(true);
  } finally {
    setLoading(false);
  }
};


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return {
    formData,
    setFormData,
    message,
    messageType,
    openSnackbar,
    loading,
    errors,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
    
  };
};
