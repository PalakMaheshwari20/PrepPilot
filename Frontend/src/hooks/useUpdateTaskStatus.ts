import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskStatus } from '../api/taskStatus';

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      topicId,
      taskId,
      status,
    }: {
      topicId: number;
      taskId: number;
      status: string;
    }) => updateTaskStatus(topicId, taskId, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', variables.topicId],
      });
    },
  });
}