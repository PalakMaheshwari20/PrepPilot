import { Clock3, ListChecks } from 'lucide-react';
import type { Task } from '../types/task';
import type { Resource } from '../types/resource';
import { useUpdateTaskStatus } from '../hooks/useUpdateTaskStatus';

interface TaskDetailsProps {
  task?: Task;
  resources: Resource[];
  topicId: number;
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-700';

    case 'in_progress':
      return 'bg-amber-100 text-amber-700';

    case 'pending':
      return 'bg-slate-100 text-slate-700';

    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export default function TaskDetails({ task, resources, topicId }: TaskDetailsProps) {

if (!task) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-slate-500">Select a task.</p>
    </section>
  );
}
const updateStatus = useUpdateTaskStatus();
  return (
    <section className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Task Details</p>
          <h2 className="text-xl font-semibold text-slate-900">Selected task</h2>
        </div>
        <ListChecks className="h-6 w-6 text-slate-400" />
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-2 min-w-0">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
    task.status,
  )}`}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-700">{task.description ?? 'No description available.'}</p>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-600">Update Status</label>
            <select
              value={task.status}
              onChange={(e) =>
                updateStatus.mutate({
                  topicId,
                  taskId: task.id,
                  status: e.target.value,
                })
              }
              disabled={updateStatus.isPending}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Estimated Time</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-slate-500" /> {task.estimated_minutes} min
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Status</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                task.status === 'completed' ? 'bg-emerald-500' :
                task.status === 'in_progress' ? 'bg-amber-500' :
                'bg-slate-400'
              }`} />
              <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">{task.status.replace('_', ' ')}</span>
            </div>
          </div>

          <ul className="space-y-3 sm:col-span-2 max-h-64 overflow-auto pr-1">
  {resources.map((resource) => (
    <li
      key={resource.id}
      className="rounded-3xl border border-slate-200 bg-white transition hover:border-blue-300 hover:shadow-sm"
    >
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-medium text-blue-600 hover:underline">
              {resource.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {resource.provider}
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {resource.type}
          </span>
        </div>
      </a>
    </li>
  ))}
</ul>
        </div>
      </div>
    </section>
  );
}
