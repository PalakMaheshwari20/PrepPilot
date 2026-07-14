import { api } from './axios';
import type { Topic } from '../types/topic';

export const getTopics = async (moduleId: number): Promise<Topic[]> => {
  const { data } = await api.get<Topic[]>(`/modules/${moduleId}/topics`);
  return data;
};