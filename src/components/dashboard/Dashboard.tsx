import React, { useState } from 'react';
import { Repository, View } from '../../types/types';
import { MOCK_REPOS } from '../../services/data';
import { Navbar, Nav, Container, Form, Table, Badge, Button } from 'react-bootstrap';

interface RepoDashboardProps {
  onNavigate: (view: View, repoId?: string) => void;
}

const StatusBadge = ({ status }: { status: Repository['status'] }) => {
  const variantMap: Record<string, string> = {
    Success: 'success',
    'In Progress': 'primary',
    Warning: 'warning',
    Failure: 'danger',
  };

  return (
    <Badge bg={variantMap[status] || 'secondary'} style={{ width: '100px' }} >
      {status}
    </Badge>
  );
};

export const RepoDashboard: React.FC<RepoDashboardProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = MOCK_REPOS.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh' }}>
        <Navbar bg="white" expand="lg" className="border-bottom px-3 py-2 sticky-top">
          <Container className="max-width-6xl">
            <Navbar.Brand href="#home" className="fw-bold text-dark d-flex align-items-center gap-2">
              <span className="text-primary">▣</span> Dev Agentic Portal
            </Navbar.Brand>

            <Form.Control
              type="text"
              placeholder="Search ..."
              className="mx-auto d-flex align-items-center"
              style={{ maxWidth: '400px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Nav.Link href="#profile" className="text-dark text-decoration-none small fw-medium">
                User Profile 👤
              </Nav.Link>
              <Nav.Link href="#settings" className="text-dark text-decoration-none small fw-medium">
                Settings ⚙️
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      

      <Container className="py-5 max-width-6xl">
        <h1 className="h4 fw-bold text-uppercase tracking-wide mb-2">My Repositories</h1>
        <hr className="mb-4" />

        <div className="shadow-sm border rounded-3 overflow-hidden">
          <Table hover responsive className="mb-0">
            <thead className="bg-light text-secondary text-uppercase small">
              <tr>
                <th className="px-4 py-3">Repo Name</th>
                <th className="px-4 py-3">Last Agent Activity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-end">Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepos.map(repo => (
                <tr key={repo.id}>
                  <td className="px-4 py-3">
                    <Button
                      variant="link"
                      className="text-decoration-none fw-medium p-0"
                      onClick={() => onNavigate('Insights', repo.id)}
                    >
                      {repo.name}
                    </Button>
                  </td>
                  <td className="px-4 py-3 text-muted small">
                    {repo.lastActivity}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={repo.status} />
                  </td>
                  <td className="px-4 py-3 text-end">
                    {repo.status === 'In Progress' ? (
                      <Button
                        variant="light"
                        size="sm"
                        className="border"
                        onClick={() => onNavigate('Monitor', repo.id)}
                        style={{width: '100px'}}
                      >
                        View Log 📄
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onNavigate('Insights', repo.id)}
                        style={{width: '100px'}}
                      >
                        Trigger ⚡
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-4">
          <Button
            variant="primary"
            className="border-dashed py-2 px-4"
            style={{ borderStyle: 'dashed' }}
          >
            + Add Repository
          </Button>
        </div>
      </Container>
    </div>
  );
};