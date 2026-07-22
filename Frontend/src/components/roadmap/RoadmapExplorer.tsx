import React from 'react';
import ModuleList from '../ModuleList';
import TopicList from '../TopicList';
import TaskDetails from '../TaskDetails';

interface Props {
  modules: any[];
  topics: any[];
  tasks: any[];
  resources: any[];
  selectedModuleId: number;
  setSelectedModuleId: (id: number) => void;
  selectedTopicId: number;
  setSelectedTopicId: (id: number) => void;
  selectedTaskId: number;
  setSelectedTaskId: (id: number) => void;
  selectedTask?: any;
}

export default function RoadmapExplorer({
  modules,
  topics,
  tasks,
  resources,
  selectedModuleId,
  setSelectedModuleId,
  selectedTopicId,
  setSelectedTopicId,
  selectedTask,
}: Props) {
  return (
    <div className="mt-6 grid h-[calc(100%-180px)] gap-6 xl:grid-cols-[280px_minmax(560px,1fr)_360px]">
      <ModuleList modules={modules ?? []} selectedModuleId={selectedModuleId} onSelectModule={setSelectedModuleId} />
      <TopicList topics={topics ?? []} selectedTopicId={selectedTopicId} onSelectTopic={setSelectedTopicId} />
      <TaskDetails task={selectedTask} resources={resources ?? []} topicId={selectedTopicId} />
    </div>
  );
}
