import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Profile } from '../types/profileTypes';
import * as profileAPI from '../services/profileServices';

const savedProfile = localStorage.getItem('profile');

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProfileById = createAsyncThunk(
  'profile/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await profileAPI.getProfileById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProfileThunk = createAsyncThunk(
  'profile/create',
  async (profile: Profile, { rejectWithValue }) => {
    try {
      const data = await profileAPI.createProfile(profile);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'profile/update',
  async ({ id, profile }: { id: string; profile: Profile }, { rejectWithValue }) => {
    try {
      const data = await profileAPI.updateProfile(id, profile);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProfileThunk = createAsyncThunk(
  'profile/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await profileAPI.deleteProfile(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      localStorage.removeItem('profile');
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileById
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem('profile', JSON.stringify(action.payload));
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createProfileThunk
      .addCase(createProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem('profile', JSON.stringify(action.payload));
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateProfileThunk
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem('profile', JSON.stringify(action.payload));
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // deleteProfileThunk
      .addCase(deleteProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileThunk.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        localStorage.removeItem('profile');
      })
      .addCase(deleteProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
