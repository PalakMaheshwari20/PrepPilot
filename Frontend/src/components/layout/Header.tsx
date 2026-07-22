import { Sparkles } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { useResetProgress } from '../../hooks/useResetProgress';
import React from 'react';

interface HeaderProps {
  dashboard?: {
    overall_progress?: number;
    completed_tasks?: number;
    pending_tasks?: number;
  } | null;
}

export default function Header({ dashboard }: HeaderProps) {

  const resetProgress = useResetProgress();

  const handleReset = () => {
    if (!window.confirm('Reset all progress?')) return;

    resetProgress.mutate();
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">PrepPilot</p>
          <h1 className="text-2xl font-semibold text-slate-900">Interview Prep Dashboard</h1>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
          <Sparkles className="h-4 w-4 text-slate-500" />

          <span>
            Progress: <strong>{dashboard?.overall_progress ?? 0}%</strong>
          </span>

          <span>
            ✓ {dashboard?.completed_tasks ?? 0}
          </span>

          <span>
            ○ {dashboard?.pending_tasks ?? 0}
          </span>
        </div>
              <button
        onClick={handleReset}
        disabled={resetProgress.isPending}
        className="rounded-full p-1 transition hover:bg-slate-200"
        title="Reset Progress"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      </div>
    </header>
  );
}
