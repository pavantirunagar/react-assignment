import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Profile } from '../types/profileTypes';

const savedProfile = localStorage.getItem('profile');
const initialState: { profile: Profile | null } = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    deleteProfile(state) {
      state.profile = null;
      localStorage.removeItem('profile');
    },
  },
});

export const { setProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
