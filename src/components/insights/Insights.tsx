import React, { useState } from 'react';
import { Repository, View } from '../../types/types';
import { MOCK_REPOS, MOCK_TASKS } from '../../services/data';
import { Button, Container } from 'react-bootstrap';

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
      <Container className="py-5 max-width-6xl">
        <header className="flex items-center gap-4 mb-8 border-b pb-4">
          <Button
            onClick={() => onNavigate('Dashboard')}
            className="text-decoration-none fw-medium p-0"
            variant='link'
          >
            ← Back to Repos
          </Button>
          <span className="text-gray-300" style={{marginLeft: '5px', marginRight: '5px'}}>|</span>
          <span className="fw-medium p-0">
            {repo.name} / Insights
          </span>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Repo Health Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Main Branch', value: repo.health.branch, icon: '🟢' },
              { label: 'Dependencies', value: repo.health.dependencies, icon: '📦' },
              { label: 'Test Coverage', value: repo.health.testCoverage, icon: '🧪' },
              { label: 'Open Issues', value: repo.health.openIssues, icon: '⚠️' },
              { label: 'Last Commit', value: repo.health.lastCommit, icon: '🕒' },
              { label: 'Build Status', value: repo.health.buildStatus, icon: '🚀' },
            ].map((item, idx) => (
              <div key={idx} className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm truncate">
                <span>{item.icon} {item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Trigger AI Agent
          </h2>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Choose a Task:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {MOCK_TASKS.map(task => (
                <label
                  key={task.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTaskId === task.id
                      ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-700 shadow-sm font-medium'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="task"
                    checked={selectedTaskId === task.id}
                    onChange={() => setSelectedTaskId(task.id)}
                  />
                  <span className="text-sm">{task.icon} {task.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Prompt / Instructions:
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32 text-sm transition-all bg-gray-50 focus:bg-white"
              placeholder="e.g., Refactor the auth middleware to use the new session provider..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => onNavigate('Monitor', repo.id)}
              variant="primary"
              className="border-dashed py-2 px-4"
            >
              LAUNCH AGENT 🚀
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};
