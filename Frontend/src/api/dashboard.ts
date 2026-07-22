import { api } from './axios';
import type { Dashboard } from '../types/dashboard';

export const getDashboard = async (): Promise<Dashboard> => {
  const { data } = await api.get<Dashboard>('/dashboard');
  return data;
};