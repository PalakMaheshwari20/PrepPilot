import { useQuery } from '@tanstack/react-query';
import { getResources } from '../api/resources';

export function useResources(taskId?: number) {
  return useQuery({
    queryKey: ['resources', taskId],
    queryFn: () => getResources(taskId as number),
    enabled: !!taskId,
  });
}