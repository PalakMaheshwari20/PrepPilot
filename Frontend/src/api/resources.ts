import { api } from './axios';
import type { Resource } from '../types/resource';

export const getResources = async (
  taskId: number,
): Promise<Resource[]> => {
  const { data } = await api.get<Resource[]>(
    `/tasks/${taskId}/resources`,
  );

  return data;
};