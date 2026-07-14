import { api } from './axios';
import type { Module } from '../types/module';

export const getModules = async (roadmapId: number): Promise<Module[]> => {
  const { data } = await api.get<Module[]>(`/roadmaps/${roadmapId}/modules`);
  return data;
};