import React, { useState } from 'react';
import { Repository, View } from '../../types/types';
import { MOCK_REPOS, MOCK_TASKS } from '../../services/data';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

interface RepoInsightsProps {
  repoId: string;
  onNavigate: (view: View, repoId?: string) => void;
}

export const RepoInsights: React.FC<RepoInsightsProps> = ({ repoId, onNavigate }) => {
  const repo = MOCK_REPOS.find(r => r.id === repoId);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(MOCK_TASKS[0].id);
  const [prompt, setPrompt] = useState('');

  if (!repo) return <div>Repository not found</div>;
  const items = [
              { label: 'Main Branch', value: repo.health.branch, icon: '🟢' },
              { label: 'Dependencies', value: repo.health.dependencies, icon: '📦' },
              { label: 'Test Coverage', value: repo.health.testCoverage, icon: '🧪' },
              { label: 'Open Issues', value: repo.health.openIssues, icon: '⚠️' },
              { label: 'Last Commit', value: repo.health.lastCommit, icon: '🕒' },
              { label: 'Build Status', value: repo.health.buildStatus, icon: '🚀' },
            ];

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
          <Row xs={1} md={3} className="g-4">
            {items.map((item, index) => (
              <Col key={index}>
                <div key={index} className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm truncate">
                  <span>{item.icon} {item.label}: {item.value}</span>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <section className="border-t pt-8" style={{marginTop:'15px'}}>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Trigger AI Agent
          </h2>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Choose a Task:
            </label>
            <Row xs={1} md={3} className="g-4">
              {MOCK_TASKS.map((task, index) => (
                <Col key={index}>
                  <div key={index} className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm truncate">
                    <label
                      key={task.id}
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
                  </div>  
                </Col>
              ))}
            </Row>
          </div>

          <div className="mb-8">
            <div style={{marginTop: '15px'}}>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Prompt / Instructions:
              </label>
            </div>
            <div>
              <Form.Control 
                as="textarea" 
                className="w-100 h-100" 
                placeholder="e.g., Refactor the auth middleware to use the new session provider..." 
                style={{ resize: 'none' }} 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end" style={{marginTop:'15px'}}>
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
