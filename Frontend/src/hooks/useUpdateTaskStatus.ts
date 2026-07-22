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
      // Refresh the current topic's tasks
      queryClient.invalidateQueries({
        queryKey: ['tasks', variables.topicId],
      });

      // Refresh dashboard statistics
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });

      // Refresh the current study session
      queryClient.removeQueries({
  queryKey: ['study-session'],
});
    },
  });
}