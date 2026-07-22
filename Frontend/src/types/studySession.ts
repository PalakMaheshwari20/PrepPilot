export interface StudyTask {
  task_id: number;
  roadmap_id: number;
  module_id: number;
  topic_id: number;
  title: string;
  topic: string;
  module: string;
  estimated_minutes: number;
  status: string;
}

export interface StudySession {
  requested_minutes: number;
  total_minutes: number;
  task_count: number;
  tasks: StudyTask[];
}
