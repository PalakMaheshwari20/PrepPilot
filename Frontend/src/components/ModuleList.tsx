import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Module } from '../types/module';

interface ModuleListProps {
  modules: Module[];
  selectedModuleId: number;
  onSelectModule: (id: number) => void;
}

export default function ModuleList({ modules, selectedModuleId, onSelectModule }: ModuleListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex h-full min-h-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Modules</p>
          <h2 className="text-xl font-semibold text-slate-900">Learning Path</h2>
        </div>
      </div>

      <ul className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-2 max-h-[calc(100vh-220px)] no-scrollbar">
        {modules.map((module) => {
          const expanded = expandedId === module.id;
          const selected = selectedModuleId === module.id;
          return (
            <li
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`cursor-pointer rounded-2xl border transition overflow-hidden ${
                selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'
              } ${expanded ? 'p-4' : 'p-3'}`}
            >
              <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{module.title}</p>
                  </div>

                  {/* compact description */}
                  {!expanded ? (
                      <p className="mt-1 text-sm text-slate-500 truncate">{module.description}</p>
                  ) : (
                      <p className="mt-2 text-sm text-slate-700 whitespace-normal break-words">{module.description}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(module.id);
                    }}
                    className="-mr-2 ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-500 hover:bg-slate-100"
                  >
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
