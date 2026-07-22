import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetProgress } from '../api/reset';

export function useResetProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetProgress,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['study-session'],
        });
    queryClient.invalidateQueries();
    },
  });
}