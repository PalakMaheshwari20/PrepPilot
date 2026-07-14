import { useQuery } from '@tanstack/react-query';
import { getRoadmaps } from '../api/roadmap';

export function useRoadmaps() {
  return useQuery({
    queryKey: ['roadmaps'],
    queryFn: getRoadmaps,
  });
}