import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Topic } from '../types/topic';

interface TopicListProps {
  topics: Topic[];
  selectedTopicId: number;
  onSelectTopic: (id: number) => void;
}

export default function TopicList({ topics, selectedTopicId, onSelectTopic }: TopicListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Topics</p>
          <h2 className="text-xl font-semibold text-slate-900">Current module</h2>
        </div>
        <BookOpen className="h-6 w-6 text-slate-400" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 no-scrollbar">
        {topics.map((topic) => {
          const expanded = expandedId === topic.id;
          const selected = selectedTopicId === topic.id;
          return (
            <article
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`cursor-pointer rounded-2xl border transition overflow-hidden ${
                selected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'
              } ${expanded ? 'p-4' : 'p-3'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900">{topic.title}</h3>

                  {/* description only when expanded */}
                  {expanded && (
                    <p className="mt-2 text-sm text-slate-700 whitespace-normal break-words">{topic.description}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={(e) => toggle(topic.id, e)}
                    className="-mr-2 ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-500 hover:bg-slate-100"
                  >
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
