import { api } from './axios';
import type { Roadmap } from '../types/roadmap';

export const getRoadmaps = async (): Promise<Roadmap[]> => {
  const { data } = await api.get<Roadmap[]>('/roadmaps');
  return data;
};

export const getRoadmap = async (id: number): Promise<Roadmap> => {
  const { data } = await api.get<Roadmap>(`/roadmaps/${id}`);
  return data;
};