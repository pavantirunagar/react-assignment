import axios from 'axios';
import type { Profile } from '../types/profileTypes';
import { BASE_URL } from '../constants';

export const createProfile = async (profile: Profile) => {
  const res = await axios.post(BASE_URL, profile);
  return res.data;
};

export const updateProfile = async (id: string, profile: Profile) => {
  const res = await axios.put(`${BASE_URL}/${id}`, profile);
  return res.data;
};

export const getProfileById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const deleteProfile = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};