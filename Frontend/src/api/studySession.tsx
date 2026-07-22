import type { StudySession } from '../types/studySession';
import { api } from './axios';

export const getStudySession = async (
  minutes: number
): Promise<StudySession> => {
  const { data } = await api.get('/study-session', {
    params: { minutes },
  });

  return data;
};