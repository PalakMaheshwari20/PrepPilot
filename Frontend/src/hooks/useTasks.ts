import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';

export function useTasks(topicId: number) {
  return useQuery({
    queryKey: ['tasks', topicId],
    queryFn: () => getTasks(topicId),
    enabled: !!topicId,
  });
}