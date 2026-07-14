import { Sparkles } from 'lucide-react';
import ModuleList from './components/ModuleList';
import TopicList from './components/TopicList';
import TaskDetails from './components/TaskDetails';
import { useState, useEffect } from 'react';
import { useTopics } from './hooks/useTopics';
import { useRoadmaps } from './hooks/useRoadmaps';
import { useModules } from './hooks/useModules';
import { useResources } from './hooks/useResources';
import { useTasks } from './hooks/useTasks';
function App() {
    const { data } = useRoadmaps();
    const roadmapId = data?.[0]?.id ?? 0;
    const { data: modulesData } = useModules(roadmapId);
    const [selectedModuleId, setSelectedModuleId] = useState<number>(0);

useEffect(() => {
  if (modulesData?.length && selectedModuleId === 0) {
    setSelectedModuleId(modulesData[0].id);
  }
}, [modulesData, selectedModuleId]);

const { data: topicsData } = useTopics(selectedModuleId);
const [selectedTopicId, setSelectedTopicId] = useState<number>(0);

useEffect(() => {
  if (topicsData?.length && selectedTopicId === 0) {
    setSelectedTopicId(topicsData[0].id);
  }
}, [topicsData, selectedTopicId]);

const { data: tasksData } = useTasks(selectedTopicId);
const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

useEffect(() => {
  if (tasksData?.length) {
    setSelectedTaskId(tasksData[0].id);
  }
}, [tasksData]);

const { data: resourcesData } = useResources(selectedTaskId);
const selectedTask =
  tasksData?.find(task => task.id === selectedTaskId);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">PrepPilot</p>
            <h1 className="text-2xl font-semibold text-slate-900">Interview Prep Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
            <Sparkles className="h-4 w-4 text-slate-500" />
            Focus on the next task
          </div>
        </div>
      </header>

      <main className="mx-auto h-[calc(100vh-81px)] max-w-7xl overflow-hidden px-6 py-6">
        <div className="grid h-full gap-6 xl:grid-cols-[280px_minmax(560px,1fr)_360px]">
          <ModuleList
            modules={modulesData ?? []}
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
          />
          <TopicList
            topics={topicsData ?? []}
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
          />
          <TaskDetails
  task={selectedTask}
  resources={resourcesData ?? []}
  topicId={selectedTopicId}
/>
        </div>
      </main>
    </div>
  );
}

export default App;
