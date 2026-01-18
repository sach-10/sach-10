
import React, { useState } from 'react';
// Fix: Use namespace import to avoid named export resolution issues in the build environment.
import * as ReactRouterDOM from 'react-router-dom';
import { Send, Sparkles, AlertCircle, FileUp, Info } from 'lucide-react';
import { analyzeProtocol } from '../services/geminiService';
import { EventStatus } from '../types';

// Destructure the useNavigate hook from the ReactRouterDOM namespace.
const { useNavigate } = ReactRouterDOM;

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    budget: '',
    description: '',
    department: ''
  });

  const handleAiReview = async () => {
    if (!formData.name || !formData.description) {
      alert("Please fill in the name and description for AI analysis.");
      return;
    }
    setLoading(true);
    const result = await analyzeProtocol({
      name: formData.name,
      description: formData.description,
      budget: Number(formData.budget)
    });
    setAiAnalysis(result);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit the API
    alert("Proposal submitted successfully and routed for Faculty Review.");
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Propose New Event</h1>
        <p className="text-slate-500">Ensure all fields comply with the official college event protocol guidelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Title</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g., Annual Tech Expo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Proposed Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Venue</label>
                <select 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                >
                  <option value="">Select Venue</option>
                  <option value="Auditorium">Main Auditorium</option>
                  <option value="Conference Hall">Conference Hall</option>
                  <option value="Grounds">College Grounds</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g., Computer Science"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Estimated Budget ($)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="0.00"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description & Objective</label>
              <textarea 
                required
                rows={4}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Detail the event's purpose, activities, and expected outcome..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Supporting Documents</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-indigo-400 transition-colors group cursor-pointer">
                <div className="space-y-1 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500" />
                  <div className="flex text-sm text-slate-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, DOC, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} /> Submit Proposal
            </button>
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} />
              <h3 className="font-bold">AI Protocol Review</h3>
            </div>
            <p className="text-sm text-indigo-100 mb-6">Use our Gemini-powered engine to check your proposal against college standards before submitting.</p>
            <button 
              onClick={handleAiReview}
              disabled={loading}
              className="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Run AI Check"}
            </button>

            {aiAnalysis && (
              <div className="mt-6 pt-6 border-t border-white/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-100">Protocol Score</span>
                  <span className="font-bold text-lg">{aiAnalysis.overallScore}/10</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-200 uppercase mb-2">Suggestions</p>
                  <ul className="text-xs space-y-1 text-indigo-50">
                    {aiAnalysis.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex gap-2">
                        <span className="opacity-50">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 ${
                  aiAnalysis.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-amber-500/20 text-amber-100'
                }`}>
                  <AlertCircle size={14} /> Risk Level: {aiAnalysis.riskLevel}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Info size={18} />
              <h3 className="font-bold">Protocol Rules</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-3">
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">1.</span>
                Submit at least 15 days prior to event.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">2.</span>
                Budget exceeding $5,000 requires special Dean approval.
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">3.</span>
                Maximum 2 major events per department per semester.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
