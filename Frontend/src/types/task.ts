export interface Task {
  id: number;
  topic_id: number;
  title: string;
  description: string | null;
  status: string;
  type: string;
  difficulty: string | null;
  estimated_minutes: number;
  order: number;
}