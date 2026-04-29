import React, { useState } from 'react';
import { Repository, View } from '../types';
import { MOCK_REPOS } from '../mocks/data';

interface RepoDashboardProps {
  onNavigate: (view: View, repoId?: string) => void;
}

const StatusBadge = ({ status }: { status: Repository['status'] }) => {
  const colors: Record<string, string> = {
    Success: 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Warning: 'bg-yellow-100 text-yellow-800',
    Failure: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

export const RepoDashboard: React.FC<RepoDashboardProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = MOCK_REPOS.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Repositories</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Repos..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </header>

      <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Repo Name</th>
              <th className="px-6 py-3 font-semibold">Last Agent Activity</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRepos.map(repo => (
              <tr key={repo.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() => onNavigate('Insights', repo.id)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {repo.name}
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {repo.lastActivity}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={repo.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  {repo.status === 'In Progress' ? (
                    <button
                      onClick={() => onNavigate('Monitor', repo.id)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      View Log 📄
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('Insights', repo.id)}
                      className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      Trigger ⚡
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-start">
        <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 rounded-lg transition-all text-sm font-medium">
          + Add Repository
        </button>
      </div>
    </div>
  );
};
