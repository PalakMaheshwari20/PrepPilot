import { useQuery } from '@tanstack/react-query';
import { getModules } from '../api/modules';

export function useModules(roadmapId?: number) {
  return useQuery({
    queryKey: ['modules', roadmapId],
    queryFn: () => getModules(roadmapId as number),
    enabled: !!roadmapId,
  });
}