import React, { useState } from 'react';
import { Search, Power } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { APPS } from '../constants';
import { AppID } from '../types';

export const StartMenu = () => {
  const { isStartMenuOpen, launchApp } = useOS();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isStartMenuOpen) return null;

  const pinnedApps = Object.values(APPS).filter(app => app.id !== AppID.COPILOT);

  const filteredApps = searchTerm 
    ? pinnedApps.filter(app => app.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : pinnedApps;

  return (
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[600px] h-[700px] bg-gray-900/85 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-[9999] animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Search */}
      <div className="p-6 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input 
            type="text" 
            placeholder="Search for apps, settings, and documents"
            className="w-full bg-[#1f1f1f] border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Pinned */}
      <div className="flex-1 p-6 pt-2 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/90">Pinned</h3>
          <button className="text-xs px-2 py-1 rounded hover:bg-white/5 text-white/70">All apps &gt;</button>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {filteredApps.map(app => (
            <button 
              key={app.id}
              onClick={() => launchApp(app.id)}
              className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 text-white/90 group-hover:scale-105 transition-transform duration-200">
                {app.icon}
              </div>
              <span className="text-[11px] text-white/90 font-medium truncate w-full text-center">
                {app.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 mb-4">
          <h3 className="text-sm font-semibold text-white/90">Recommended</h3>
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer">
                <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-300 font-bold text-xs">W</div>
                <div className="flex flex-col">
                    <span className="text-xs text-white/90 font-medium">Project_Alpha_Specs.docx</span>
                    <span className="text-[10px] text-white/50">17m ago</span>
                </div>
            </div>
             <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-green-300 font-bold text-xs">X</div>
                <div className="flex flex-col">
                    <span className="text-xs text-white/90 font-medium">Budget_Q3.xlsx</span>
                    <span className="text-[10px] text-white/50">2h ago</span>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-14 bg-[#181818]/50 border-t border-white/5 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <span className="text-xs text-white/90 font-medium">John Doe</span>
        </div>
        <button className="p-2 hover:bg-white/5 rounded text-white/80">
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};
