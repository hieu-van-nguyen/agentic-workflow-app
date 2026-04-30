import React, { useState, useEffect, useRef } from 'react';
import { View } from '../../types/types';
import { MOCK_REPOS, SIMULATED_LOGS } from '../../services/data';
import { Button, Container } from 'react-bootstrap';

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
      <Container className="py-5 max-width-6xl">
        <header className="flex items-center justify-between mb-8">
          <Button
            onClick={() => onNavigate('Insights', repo.id)}
            className="text-decoration-none fw-medium p-0"
            variant='link'
          >
            ← Repo Insights
          </Button>
          <span className="text-gray-300" style={{marginLeft: '5px', marginRight: '5px'}}>|</span>
          <span className="fw-medium p-0">
            Agent Execution: Refactor Auth Middleware
          </span>
          <div className="w-24" /> {/* Spacer */}
        </header>

        <div style={{marginTop:'15px'}}>
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
              <span className="text-sm font-medium text-gray-600" style={{marginLeft:'20px'}}>{progress}%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-0 bg-gray-900 py-1 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800">
            <h3>Agent Logs (Live)</h3>
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

        <div className="mt-6 flex justify-between items-center" style={{marginTop:'20px'}}>
          <Button
            onClick={() => setStatus('Stopped')}
            disabled={status !== 'Processing'}
            variant="secondary"
            className="border-dashed py-2 px-4"
            style={{marginRight:'10px'}}
          >
            🛑 Stop Agent
          </Button>
          <Button
            onClick={() => setStatus('Processing')}
            disabled={status !== 'Stopped'}
            variant="secondary"
            className="border-dashed py-2 px-4"
            style={{marginRight:'10px'}}
          >
            Retry Agent
          </Button>
          <Button 
            onClick={() => alert('Notification sent')}
            variant="primary"
            className="border-dashed py-2 px-4"
          >
            📩 Notify me on end
          </Button>
        </div>
      </Container>
    </div>
  );
};
