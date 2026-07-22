import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getStudySession } from '../api/studySession';
import type { StudySession } from '../types/studySession';

type StudySessionQueryOptions = Omit<
  UseQueryOptions<StudySession, Error, StudySession, readonly unknown[]>,
  'queryKey' | 'queryFn'
>;

export function useStudySession(
  minutes: number,
  options?: StudySessionQueryOptions,
) {
  return useQuery({
    queryKey: ['study-session', minutes],
    queryFn: () => getStudySession(minutes),
    ...options,
  });
}