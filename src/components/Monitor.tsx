import React, { useState, useEffect, useRef } from 'react';
import { View } from '../types';
import { MOCK_REPOS, SIMULATED_LOGS } from '../mocks/data';

interface ExecutionMonitorProps {
  repoId: string;
  onNavigate: (view: View, repoId?: string) => void;
}

export const ExecutionMonitor: React.FC<ExecutionMonitorProps> = ({ repoId, onNavigate }) => {
  const repo = MOCK_REPOS.find(r => r.id === repoId);
  const [logs, setLogs] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'Processing' | 'Completed' | 'Stopped'>('Processing');
  const logEndRef = useRef<HTMLDivElement>(null);

  // For simulation: use a default set of logs if no specific task is selected
  // In a real app, we would pass the selectedTaskId from Insights
  const logSequence = SIMULATED_LOGS['refactor'] || [];

  useEffect(() => {
    if (status !== 'Processing') return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < logSequence.length) {
        const entry = logSequence[index];
        setLogs(prev => [...prev, entry]);
        setProgress(Math.round(((index + 1) / logSequence.length) * 100));
        index++;
      } else {
        setStatus('Completed');
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status, logSequence]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!repo) return <div>Repository not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto h-screen flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('Insights', repo.id)}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Repo Insights
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Agent Execution: Refactor Auth Middleware
        </h1>
        <div className="w-24" /> {/* Spacer */}
      </header>

      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${
              status === 'Completed' ? 'text-green-600' : 'text-blue-600'
            }`}>
              STATUS: {status === 'Processing' ? '⏳ PROCESSING' : status === 'Completed' ? '✅ COMPLETED' : '🛑 STOPPED'}
            </span>
            <span className="text-xs text-gray-400">
              (Step {logs.length}/{logSequence.length})
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 bg-gray-900 rounded-2xl p-4 font-mono text-sm text-gray-300 shadow-inner overflow-y-auto relative">
        <div className="sticky top-0 bg-gray-900 px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800">
          Agent Logs (Live)
        </div>

        <div className="space-y-2">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-gray-500 shrink-0">[{log.timestamp}]</span>
              <span className="shrink-0">{log.icon}</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {logs.length === 0 && status === 'Processing' && (
          <div className="h-full flex items-center justify-center text-gray-500 italic">
            Initializing agent...
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setStatus('Stopped')}
          disabled={status !== 'Processing'}
          className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🛑 Stop Agent
        </button>
        <button className="px-6 py-2 bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 rounded-lg font-semibold transition-all">
          📩 Notify me on end
        </button>
      </div>
    </div>
  );
};
