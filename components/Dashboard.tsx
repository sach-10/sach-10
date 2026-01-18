
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight,
  TrendingUp,
  Users,
  CalendarDays
} from 'lucide-react';
import { EventProposal, EventStatus } from '../types';
import { useAuth } from '../App';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<EventProposal[]>([]);

  useEffect(() => {
    // Mock data fetching
    const mockProposals: EventProposal[] = [
      {
        id: '1',
        name: 'Tech Symposium 2024',
        date: '2024-06-15',
        venue: 'Auditorium A',
        organizerId: 's1',
        department: 'Computer Science',
        budget: 5000,
        description: 'Annual technical conference for students.',
        status: EventStatus.PENDING_ADMIN,
        createdAt: '2024-05-01',
        documents: []
      },
      {
        id: '2',
        name: 'Cultural Fest',
        date: '2024-08-20',
        venue: 'Main Ground',
        organizerId: 's2',
        department: 'Arts',
        budget: 12000,
        description: 'A grand celebration of art and culture.',
        status: EventStatus.APPROVED,
        createdAt: '2024-04-15',
        documents: []
      },
      {
        id: '3',
        name: 'AI Workshop',
        date: '2024-05-30',
        venue: 'Lab 3',
        organizerId: 's1',
        department: 'Computer Science',
        budget: 1500,
        description: 'Hands-on session on neural networks.',
        status: EventStatus.REJECTED,
        createdAt: '2024-05-05',
        documents: []
      }
    ];
    setProposals(mockProposals);
  }, []);

  const stats = [
    { label: 'Total Proposals', value: proposals.length, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Approval', value: proposals.filter(p => p.status === EventStatus.PENDING_FACULTY || p.status === EventStatus.PENDING_ADMIN).length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Approved Events', value: proposals.filter(p => p.status === EventStatus.APPROVED).length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Budget Utilized', value: `$${proposals.reduce((acc, curr) => acc + (curr.status === EventStatus.APPROVED ? curr.budget : 0), 0)}`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const chartData = [
    { name: 'Jan', count: 4 },
    { name: 'Feb', count: 7 },
    { name: 'Mar', count: 5 },
    { name: 'Apr', count: 12 },
    { name: 'May', count: 9 },
    { name: 'Jun', count: 15 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Protocol Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user?.name}. Here's the current state of event approvals.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase">Monthly</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Submission Trends</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View Report <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Recent Submissions</h3>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex gap-4 group cursor-pointer">
                <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  proposal.status === EventStatus.APPROVED ? 'bg-emerald-50 text-emerald-600' :
                  proposal.status === EventStatus.REJECTED ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {proposal.status === EventStatus.APPROVED ? <CheckCircle2 size={18} /> : 
                   proposal.status === EventStatus.REJECTED ? <AlertCircle size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4 group-last:border-none">
                  <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{proposal.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{proposal.department} • {proposal.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 bg-slate-50 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
