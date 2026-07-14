import { api } from './axios';
import type { Task } from '../types/task';

export const getTasks = async (topicId: number): Promise<Task[]> => {
  const { data } = await api.get<Task[]>(`/topics/${topicId}/tasks`);
  return data;
};