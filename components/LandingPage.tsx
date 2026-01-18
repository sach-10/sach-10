
import React from 'react';
// Fix: Use namespace import to avoid named export resolution issues in the build environment.
import * as ReactRouterDOM from 'react-router-dom';
import { School, ArrowRight, ShieldCheck, Zap, Users, CheckCircle } from 'lucide-react';

// Destructure the Link component from the ReactRouterDOM namespace.
const { Link } = ReactRouterDOM;

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <header className="px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <School className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">EduProtocol</span>
          </div>
          <Link 
            to="/auth" 
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Login
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-6">Streamlining Campus Activities</span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-8">
                College Event <span className="text-indigo-600">Protocol</span> Management
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                A centralized, professional platform to organize, approve, and document every event on campus. Integrated with AI-driven protocol checking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/auth" 
                  className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all text-center flex items-center justify-center gap-2 shadow-xl shadow-indigo-200"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all text-center border border-slate-200">
                  View Demo
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-indigo-50 to-transparent -z-10 blur-3xl opacity-50 rounded-full" />
        </section>

        <section className="py-24 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Campus Standards</h2>
              <p className="text-slate-500">Simplify the complex approval workflows of academic institutions with professional tools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Secure Approvals', desc: 'Multi-level workflow from Faculty review to Principal approval.', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'AI Protocol Check', desc: 'Instant analysis of event proposals against college guidelines.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                { title: 'Unified Calendar', desc: 'Single source of truth for all approved department events.', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-bold leading-tight">Trusted by over 50+ <br/> Educational Institutions</h2>
              <div className="space-y-4">
                {[
                  'Official documentation for every approval',
                  'Centralized budget tracking and reports',
                  'Instant notifications for students and faculty',
                  'Archived records for institutional history'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-1 rounded-full"><CheckCircle className="text-indigo-400" size={18} /></div>
                    <span className="text-indigo-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-[3rem] shadow-2xl">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl">
                  <p className="text-slate-600 italic">"EduProtocol revolutionized how we handle student festivals. The transparency is unparalleled."</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Dr. Robert Miller</p>
                      <p className="text-xs text-slate-500">Dean of Student Affairs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1 rounded-lg">
              <School className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">EduProtocol</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 College Event Protocol Management. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Privacy</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Terms</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
