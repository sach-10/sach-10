
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Check, 
  X as Close, 
  Eye,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { EventProposal, EventStatus, UserRole } from '../types';
import { useAuth } from '../App';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const mockRequests: EventProposal[] = [
    {
      id: '1',
      name: 'Startup Pitch Night',
      date: '2024-07-10',
      venue: 'Innovation Hub',
      organizerId: 's5',
      department: 'Business School',
      budget: 3000,
      description: 'Entrepreneurs pitching to local VCs.',
      status: EventStatus.PENDING_FACULTY,
      createdAt: '2024-05-10',
      documents: []
    },
    {
      id: '2',
      name: 'Global Health Summit',
      date: '2024-09-05',
      venue: 'Seminar Hall 1',
      organizerId: 's8',
      department: 'Medical Sciences',
      budget: 8500,
      description: 'Discussing post-pandemic healthcare trends.',
      status: EventStatus.PENDING_ADMIN,
      createdAt: '2024-05-12',
      documents: []
    }
  ];

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case EventStatus.APPROVED:
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">Approved</span>;
      case EventStatus.REJECTED:
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase">Rejected</span>;
      case EventStatus.PENDING_ADMIN:
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">Admin Review</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">Faculty Review</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Approval Workflow</h1>
          <p className="text-slate-500">Manage and review pending event proposals for your department.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'approved' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by event or department..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-white transition-colors">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{req.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{req.date} • {req.venue}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {req.department}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-800 font-bold">
                    ${req.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      {(user?.role === UserRole.FACULTY && req.status === EventStatus.PENDING_FACULTY) || 
                       (user?.role === UserRole.ADMIN && req.status === EventStatus.PENDING_ADMIN) ? (
                        <>
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Approve">
                            <Check size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reject">
                            <Close size={18} />
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {mockRequests.length === 0 && (
          <div className="p-12 text-center">
            <CheckCircle2 size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="font-bold text-slate-800">No Pending Requests</h3>
            <p className="text-sm text-slate-500">All proposals have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
