import { useEffect, useState } from 'react';
import { useStudySession } from '../../hooks/useStudySession';
import type { StudySession, StudyTask } from '../../types/studySession';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTaskStatus } from '../../hooks/useUpdateTaskStatus';
interface StudySessionCardProps {
  onSelectTask: (task: StudyTask) => void;
}

const options = [30, 60, 90, 120];

export default function StudySessionCard({
  onSelectTask,
}: StudySessionCardProps) {
  const [minutes, setMinutes] = useState(60);
 const [session, setSession] = useState<StudySession | null>(null);
const [sessionTasks, setSessionTasks] = useState<StudyTask[]>([]);

const queryClient = useQueryClient();
const updateTaskStatus = useUpdateTaskStatus();
const { data, isLoading } = useStudySession(minutes, {
  enabled: session === null,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
});

useEffect(() => {
  if (!data || session) return;

  setSession(data);
  setSessionTasks(data.tasks);
}, [data, session]);


  const handleSelectTask = (task: StudyTask) => {
    onSelectTask(task);
  };

  const handleMinutesChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    setSession(null);
    setSessionTasks([]);
    };

  const toggleTaskStatus = async (task: StudyTask) => {
  const isCompleted = task.status.toLowerCase() === 'completed';

  const newStatus = isCompleted ? 'pending' : 'completed';

  // Optimistically update this session snapshot
  setSessionTasks(prev =>
    prev.map(t =>
      t.task_id === task.task_id
        ? { ...t, status: newStatus }
        : t,
    ),
  );

  try {
    await updateTaskStatus.mutateAsync({
      topicId: task.topic_id,
      taskId: task.task_id,
      status: newStatus,
    });
  } catch {
    // Roll back on failure
    setSessionTasks(prev =>
      prev.map(t =>
        t.task_id === task.task_id
          ? { ...t, status: task.status }
          : t,
      ),
    );
  }
};

 const generateNewSession = async () => {
  setSession(null);
  setSessionTasks([]);

  await queryClient.refetchQueries({
    queryKey: ['study-session', minutes],
    exact: true,
  });
};
  const completedCount = sessionTasks.filter(
    task => task.status?.toLowerCase() === 'completed',
  ).length;
  const totalCount = sessionTasks.length;
  const isSessionComplete = completedCount === totalCount && totalCount > 0;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Today's Study Session</h2>
        <div className="mt-4 flex gap-2 flex-wrap">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleMinutesChange(option)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                option === minutes
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {option} min
            </button>
          ))}
        </div>
        {session && (
          <>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-600">
                Progress: {completedCount} / {totalCount}
              </span>
              <span className="text-sm font-medium text-slate-600">{progressPercentage}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </>
        )}
      </div>

      {isLoading && !session && (
        <p className="mt-4 text-sm text-slate-500">Generating study session...</p>
      )}

      {!session && !isLoading && (
        <p className="mt-4 text-sm text-slate-500">Select a duration to generate a session.</p>
      )}

      {session && isSessionComplete && (
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-emerald-600" />
            <div>
              <h2 className="text-2xl font-bold text-emerald-900">🎉 Session Complete</h2>
              <p className="text-sm text-emerald-700 mt-1">Completed {completedCount}/{totalCount} tasks</p>
            </div>
          </div>
          <button
            onClick={generateNewSession}
            className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Generate New Session
          </button>
        </div>
      )}

      {session && !isSessionComplete && sessionTasks.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-slate-400" />
            <div>
              <p className="font-semibold text-slate-900">🎉 You're all caught up!</p>
              <p className="text-sm text-slate-600">Generate another session later.</p>
            </div>
          </div>
        </div>
      )}

      {session && sessionTasks.length > 0 && (
        <div className="mt-5 space-y-2">
          {sessionTasks.map(task => {
            const isCompleted = task.status?.toLowerCase() === 'completed';
            return (
              <div
                key={task.task_id}
                className={`flex items-start gap-3 rounded-2xl p-3 transition cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-50 border border-emerald-100'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => handleSelectTask(task)}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleTaskStatus(task);
                  }}
                  className="flex-shrink-0 mt-1 rounded-full p-1 transition hover:bg-slate-100"
                  aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <p className={`text-xs ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                    {task.module} • {task.topic}
                  </p>
                </div>

                <div className={`flex-shrink-0 text-sm font-medium whitespace-nowrap ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                  {task.estimated_minutes} min
                </div>
              </div>
            );
          })}
        </div>
      )}

      {session && sessionTasks.length > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-700">Total Time</span>
          <span className="font-semibold text-slate-900">{session.total_minutes} min</span>
        </div>
      )}
    </div>
  );
}