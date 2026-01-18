
import React, { useState, useEffect, createContext, useContext } from 'react';
// Fix: Use namespace import to avoid named export resolution issues in the build environment.
import * as ReactRouterDOM from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  PlusCircle, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  School,
  FileText
} from 'lucide-react';
import { User, UserRole, EventProposal, EventStatus, Notification } from './types';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import CalendarView from './components/CalendarView';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';

// Destructure components and hooks from the ReactRouterDOM namespace.
const { HashRouter, Routes, Route, Navigate, Link, useNavigate } = ReactRouterDOM;

// Mock Auth Context
interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <School className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800 hidden sm:block tracking-tight">EduProtocol</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
            <p className="text-xs text-indigo-600 font-medium">{user?.role}</p>
          </div>
          <button 
            onClick={logout}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full text-slate-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useAuth();
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Calendar', icon: CalendarIcon, path: '/calendar' },
    { label: 'Propose Event', icon: PlusCircle, path: '/propose', role: [UserRole.STUDENT, UserRole.ADMIN] },
    { label: 'Management', icon: Settings, path: '/admin', role: [UserRole.ADMIN, UserRole.FACULTY] },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between lg:hidden">
          <span className="font-bold text-white">Menu</span>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="mt-4 px-3 space-y-1">
          {navItems.filter(item => !item.role || item.role.includes(user?.role!)).map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all group"
            >
              <item.icon size={20} className="group-hover:text-indigo-400" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 w-full p-6 bg-slate-950/50">
          <div className="bg-indigo-600/10 p-4 rounded-xl border border-indigo-500/20">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Support</p>
            <p className="text-xs text-slate-400">Need help with protocols? Contact the admin office.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const login = (role: UserRole) => {
    const mockUsers = {
      [UserRole.STUDENT]: { id: 's1', name: 'Alex Student', email: 'alex@college.edu', role: UserRole.STUDENT, department: 'Computer Science' },
      [UserRole.FACULTY]: { id: 'f1', name: 'Dr. Sarah Faculty', email: 'sarah@college.edu', role: UserRole.FACULTY, department: 'Computer Science' },
      [UserRole.ADMIN]: { id: 'a1', name: 'Principal Admin', email: 'admin@college.edu', role: UserRole.ADMIN, department: 'General Admin' }
    };
    setUser(mockUsers[role]);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          {user && <Navbar toggleSidebar={() => setSidebarOpen(true)} />}
          <div className="flex flex-1 overflow-hidden">
            {user && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/propose" element={<PrivateRoute><EventForm /></PrivateRoute>} />
                <Route path="/calendar" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
              </Routes>
            </main>
          </div>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
