import { api } from './axios';

export interface Resource {
  id: number;
  task_id: number;
  title: string;
  type: string;
  url: string;
}

export interface TaskDetails {
  id: number;
  topic_id: number;
  title: string;
  description: string;
  difficulty: string;
  estimated_minutes: number;
  order_index: number;
  resources: Resource[];
}

export const getTaskDetails = async (
  taskId: number,
): Promise<TaskDetails> => {
  const { data } = await api.get(`/tasks/${taskId}`);
  return data;
};