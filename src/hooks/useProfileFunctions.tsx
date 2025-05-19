import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Profile } from '../types/profileTypes';
import {
  fetchProfileById,
  createProfileThunk,
  updateProfileThunk,
} from '../redux/profileSlice';
import type { RootState } from '../redux/store';

interface UseProfileFunctionsProps {
  id?: string | undefined;
  isEditMode: boolean;
}

export const useProfileFunctions = ({ id, isEditMode }: UseProfileFunctionsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access profile state from redux to sync loading/errors
  const { profile, loading: reduxLoading } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState<Profile>({ name: '', email: '', age: '' });
  const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState<'success' | 'error' | undefined>(undefined);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // local loading for form submit
  const [errors, setErrors] = useState<{ name?: string; email?: string; age?: string }>({});

  // Load profile data on edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchProfileById(id) as any);
    }
  }, [id, isEditMode, dispatch]);

  // Update formData if profile changes (after fetch)
  useEffect(() => {
    if (profile && isEditMode) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        age: profile.age !== undefined ? String(profile.age) : '',
        id: profile.id,
      });
    }
  }, [profile, isEditMode]);

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

    if (!validateForm()) return;

    setLoading(true);

    const submitData = {
      ...formData,
      age: typeof formData.age === 'string' && formData.age.trim() !== '' ? Number(formData.age) : undefined,
    };

    try {
      if (isEditMode && id) {
        setLoading(true)
        await dispatch(updateProfileThunk({ id, profile: submitData }) as any).unwrap();
        setMessage('Profile updated successfully.');
      } else {
        await dispatch(createProfileThunk(submitData) as any).unwrap();
        setMessage('Profile created successfully.');
      }
      setMessageType('success');
      setOpenSnackbar(true);
      setTimeout(() => {navigate('/profile'),
        setLoading(false)
      } ,1500);

    } catch (err) {
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
    loading: loading || reduxLoading,
    errors,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  };
};
