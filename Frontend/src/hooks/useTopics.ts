import { useQuery } from '@tanstack/react-query';
import { getTopics } from '../api/topics';

export function useTopics(moduleId?: number) {
  return useQuery({
    queryKey: ['topics', moduleId],
    queryFn: () => getTopics(moduleId as number),
    enabled: !!moduleId,
  });
}