import { api } from './axios';

export async function updateTaskStatus(
  topicId: number,
  taskId: number,
  status: string,
) {
  const { data } = await api.patch(
    `/topics/${topicId}/tasks/${taskId}/status`,
    {
      status,
    },
  );

  return data;
}