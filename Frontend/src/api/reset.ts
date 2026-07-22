import { api } from './axios';

export async function resetProgress() {
  const { data } = await api.post('/reset');
  return data;
}