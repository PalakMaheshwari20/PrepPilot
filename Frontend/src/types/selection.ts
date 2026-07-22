export interface SelectedIds {
  selectedModuleId: number;
  selectedTopicId: number;
  selectedTaskId: number;
}

export interface SelectionSetters {
  setSelectedModuleId: (id: number) => void;
  setSelectedTopicId: (id: number) => void;
  setSelectedTaskId: (id: number) => void;
}

export interface RoadmapSelectionReturn extends SelectedIds, SelectionSetters {
  selectedTask?: any;
  modulesData?: any[];
  topicsData?: any[];
  tasksData?: any[];
  resourcesData?: any[];
  navigateToTask: (moduleId: number, topicId: number, taskId: number) => void;
}
