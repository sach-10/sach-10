
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1)); // June 2024
  
  const events = [
    { day: 15, name: 'Tech Symposium', color: 'bg-indigo-500' },
    { day: 22, name: 'Faculty Meeting', color: 'bg-slate-500' },
    { day: 28, name: 'Project Demo Day', color: 'bg-emerald-500' },
  ];

  const daysInMonth = 30;
  const firstDay = 6; // Starts on Saturday
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Calendar</h1>
          <p className="text-slate-500">Official schedule of approved college activities.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600"><ChevronLeft size={20} /></button>
            <span className="px-4 font-bold text-slate-800">June 2024</span>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600"><ChevronRight size={20} /></button>
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = events.filter(e => e.day === day);
            return (
              <div key={idx} className={`min-h-[140px] p-2 border-r border-b border-slate-50 transition-colors hover:bg-slate-50/30 ${day === null ? 'bg-slate-50/20' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold ${day === 15 ? 'w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-full' : 'text-slate-500'}`}>
                    {day}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.map((e, i) => (
                    <div key={i} className={`${e.color} text-white text-[10px] px-2 py-1 rounded-md font-bold truncate cursor-pointer shadow-sm hover:scale-105 transition-transform`}>
                      {e.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
