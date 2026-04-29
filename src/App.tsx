import React, { useState } from 'react';
import { View } from './types/types';
import { RepoDashboard } from './components/dashboard/Dashboard';
import { RepoInsights } from './components/insights/Insights';
import { ExecutionMonitor } from './components/monitor/Monitor';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [activeRepoId, setActiveRepoId] = useState<string | undefined>(undefined);

  const navigate = (view: View, repoId?: string) => {
    if (repoId) {
      setActiveRepoId(repoId);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {currentView === 'Dashboard' && (
        <RepoDashboard onNavigate={navigate} />
      )}
      {currentView === 'Insights' && (
        <RepoInsights
          repoId={activeRepoId || ''}
          onNavigate={navigate}
        />
      )}
      {currentView === 'Monitor' && (
        <ExecutionMonitor
          repoId={activeRepoId || ''}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}
