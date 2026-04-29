export type RepoStatus = 'Success' | 'In Progress' | 'Warning' | 'Failure';

export interface Repository {
  id: string;
  name: string;
  lastActivity: string;
  status: RepoStatus;
  description: string;
  health: {
    branch: string;
    dependencies: number;
    testCoverage: string;
    openIssues: number;
    lastCommit: string;
    buildStatus: string;
  };
}

export interface AgentTask {
  id: string;
  label: string;
  icon: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'search' | 'read' | 'think' | 'write' | 'test' | 'warning' | 'success';
  icon: string;
}

export type View = 'Dashboard' | 'Insights' | 'Monitor';
