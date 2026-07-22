import { useEffect, useState } from 'react';
import { useModules } from './useModules';
import { useTopics } from './useTopics';
import { useTasks } from './useTasks';
import { useResources } from './useResources';
import type { RoadmapSelectionReturn } from '../types/selection';

export function useRoadmapSelection(roadmapId?: number): RoadmapSelectionReturn {
  const { data: modulesData } = useModules(roadmapId);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(0);

  useEffect(() => {
  if (
    modulesData?.length &&
    !modulesData.some(module => module.id === selectedModuleId)
  ) {
    setSelectedModuleId(modulesData[0].id);
}
  }, [modulesData, selectedModuleId]);

  const { data: topicsData } = useTopics(selectedModuleId);
  const [selectedTopicId, setSelectedTopicId] = useState<number>(0);
    const { data: tasksData } = useTasks(selectedTopicId);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

  const { data: resourcesData } = useResources(selectedTaskId);
  const [pendingNavigation, setPendingNavigation] = useState<{
    moduleId: number;
    topicId: number;
    taskId: number;
  } | null>(null);

  useEffect(() => {
  if (!topicsData?.length) return;

  if (
    pendingNavigation &&
    pendingNavigation.moduleId === selectedModuleId
  ) {
    setSelectedTopicId(pendingNavigation.topicId);
    return;
  }

if (!topicsData.some(topic => topic.id === selectedTopicId)) {
    setSelectedTopicId(topicsData[0].id);
}
}, [
  topicsData,
  selectedTopicId,
  pendingNavigation,
  selectedModuleId,
]);


  useEffect(() => {
  if (!tasksData?.length) return;

  if (
    pendingNavigation &&
    pendingNavigation.topicId === selectedTopicId
  ) {
    setSelectedTaskId(pendingNavigation.taskId);
    setPendingNavigation(null);
    return;
  }

  if (!tasksData.some(task => task.id === selectedTaskId)) {
    setSelectedTaskId(tasksData[0].id);
  }
}, [
  tasksData,
  selectedTaskId,
  pendingNavigation,
  selectedTopicId,
]);


  const selectedTask = tasksData?.find((t: any) => t.id === selectedTaskId);
  const navigateToTask = (
    moduleId: number,
    topicId: number,
    taskId: number,
  ) => {
    setPendingNavigation({
      moduleId,
      topicId,
      taskId,
    });

    setSelectedModuleId(moduleId);
  };
  return {
    selectedModuleId,
    setSelectedModuleId,
    selectedTopicId,
    setSelectedTopicId,
    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
    modulesData,
    topicsData,
    tasksData,
    resourcesData,
    navigateToTask,
  };
}

export default useRoadmapSelection;
