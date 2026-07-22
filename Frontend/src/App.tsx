import { useEffect, useState } from 'react';
import { useRoadmaps } from './hooks/useRoadmaps';
import { useDashboard } from './hooks/useDashboard';
import useRoadmapSelection from './hooks/useRoadmapSelection';
import StudySessionCard from './components/study-session/StudySessionCard';
import Header from './components/layout/Header';
import ContentLayout from './components/layout/ContentLayout';
import RoadmapExplorer from './components/roadmap/RoadmapExplorer';

function App() {
  const { data } = useRoadmaps();
  const roadmapId = data?.[0]?.id ?? 0;
  const { data: dashboard } = useDashboard();


  const selection = useRoadmapSelection(roadmapId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header dashboard={dashboard} />

      <ContentLayout>
        <StudySessionCard
          onSelectTask={(task) =>
            selection.navigateToTask(
              task.module_id,
              task.topic_id,
              task.task_id,
            )
          }
        />
        <RoadmapExplorer
          modules={selection.modulesData ?? []}
          topics={selection.topicsData ?? []}
          tasks={selection.tasksData ?? []}
          resources={selection.resourcesData ?? []}
          selectedModuleId={selection.selectedModuleId}
          setSelectedModuleId={selection.setSelectedModuleId}
          selectedTopicId={selection.selectedTopicId}
          setSelectedTopicId={selection.setSelectedTopicId}
          selectedTaskId={selection.selectedTaskId}
          setSelectedTaskId={selection.setSelectedTaskId}
          selectedTask={selection.selectedTask}
        />
      </ContentLayout>
    </div>
  );
}

export default App;
