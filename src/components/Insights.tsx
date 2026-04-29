import React, { useState } from 'react';
import { Repository, View } from '../types';
import { MOCK_REPOS, MOCK_TASKS } from '../mocks/data';

interface RepoInsightsProps {
  repoId: string;
  onNavigate: (view: View, repoId?: string) => void;
}

export const RepoInsights: React.FC<RepoInsightsProps> = ({ repoId, onNavigate }) => {
  const repo = MOCK_REPOS.find(r => r.id === repoId);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(MOCK_TASKS[0].id);
  const [prompt, setPrompt] = useState('');

  if (!repo) return <div>Repository not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Back to Repos
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {repo.name} / Insights
        </h1>
      </header>

      <section className="mb-12">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Repo Health Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Main Branch', value: repo.health.branch, icon: '🟢' },
            { label: 'Dependencies', value: repo.health.dependencies, icon: '📦' },
            { label: 'Test Coverage', value: repo.health.testCoverage, icon: '🧪' },
            { label: 'Open Issues', value: repo.health.openIssues, icon: '⚠️' },
            { label: 'Last Commit', value: repo.health.lastCommit, icon: '🕒' },
            { label: 'Build Status', value: repo.health.buildStatus, icon: '🚀' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border rounded-xl shadow-sm flex flex-col">
              <span className="text-xs text-gray-400 font-medium mb-1">{item.label}</span>
              <span className="text-sm font-bold text-gray-800">
                {item.icon} {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-lg font-bold text-blue-900 mb-4">Trigger AI Agent</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-3">
            Choose a Task:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MOCK_TASKS.map(task => (
              <label
                key={task.id}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedTaskId === task.id
                    ? 'bg-white border-blue-500 ring-2 ring-blue-200 text-blue-700 shadow-sm'
                    : 'bg-blue-100/50 border-blue-200 text-blue-600 hover:bg-blue-100'
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="task"
                  checked={selectedTaskId === task.id}
                  onChange={() => setSelectedTaskId(task.id)}
                />
                <span>{task.icon} {task.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Prompt / Instructions:
          </label>
          <textarea
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 text-sm"
            placeholder="e.g., Refactor the auth middleware to use the new session provider..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onNavigate('Monitor', repo.id)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-md flex items-center gap-2"
          >
            LAUNCH AGENT 🚀
          </button>
        </div>
      </section>
    </div>
  );
};
