
import React from 'react';
// Fix: Use namespace import to avoid named export resolution issues in the build environment.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { User, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

// Destructure the useNavigate hook from the ReactRouterDOM namespace.
const { useNavigate } = ReactRouterDOM;

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 text-white mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Portal Login</h1>
          <p className="text-slate-500 mt-2">Choose your role to access the protocol management system</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin(UserRole.STUDENT)}
            className="w-full bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <GraduationCap size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">Student Login</p>
              <p className="text-xs text-slate-500">Propose events and track approval status</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.FACULTY)}
            className="w-full bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:border-violet-500 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <User size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">Faculty Reviewer</p>
              <p className="text-xs text-slate-500">Review department-level event proposals</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="w-full bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Briefcase size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">Admin/Principal</p>
              <p className="text-xs text-slate-500">Final approval and system management</p>
            </div>
          </button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-12">
          New to EduProtocol? <a href="#" className="text-indigo-600 font-bold hover:underline">Contact Administration</a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
