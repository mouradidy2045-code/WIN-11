import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, MessageSquare, ChevronUp } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { APPS } from '../constants';
import { AppID } from '../types';

// Windows Logo Component
const WindowsLogo = () => (
  <svg viewBox="0 0 88 88" className="w-full h-full text-sky-400 fill-current">
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402zm35.67 33.529l.028 34.453L.028 75.498l-.028-29.35 35.67-.217zM87.513 0l-47.5 6.452v35.343l47.485.228V0zm-.016 46.12l-.048 41.62-47.458-6.666.033-35.2 47.473.246z"/>
  </svg>
);

export const Taskbar = () => {
  const { windows, activeWindowId, isStartMenuOpen, toggleStartMenu, launchApp, minimizeApp, focusApp, isCopilotOpen } = useOS();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [AppID.EDGE, AppID.EXPLORER, AppID.NOTEPAD, AppID.COPILOT];
  
  // Combine pinned and open apps, unique
  const allTaskbarApps = Array.from(new Set([...pinnedApps, ...windows.map(w => w.id)]));

  const handleAppClick = (appId: AppID) => {
    if (appId === AppID.COPILOT) {
      launchApp(appId);
      return;
    }

    const isOpen = windows.find(w => w.id === appId);
    if (isOpen) {
      if (activeWindowId === appId && !isOpen.isMinimized) {
        minimizeApp(appId);
      } else {
        focusApp(appId);
      }
    } else {
      launchApp(appId);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#202020]/85 backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-2 z-[99999]">
      {/* Weather/Widgets Placeholder */}
      <div className="flex-1 flex items-center pl-2">
         <div className="flex items-center gap-2 px-3 py-1 hover:bg-white/5 rounded-md cursor-pointer transition-colors group">
            <div className="text-yellow-400">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-white/90 font-medium">72°F</span>
                <span className="text-[10px] text-white/50">Sunny</span>
            </div>
         </div>
      </div>

      {/* Center Icons */}
      <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
        {/* Start Button */}
        <button 
          onClick={toggleStartMenu}
          className={`w-10 h-10 p-2.5 rounded hover:bg-white/10 transition-all active:scale-95 ${isStartMenuOpen ? 'bg-white/10' : ''}`}
        >
          <WindowsLogo />
        </button>

        {allTaskbarApps.map(appId => {
          const config = APPS[appId];
          const isOpen = windows.find(w => w.id === appId);
          const isActive = activeWindowId === appId && !isOpen?.isMinimized;
          const isCopilot = appId === AppID.COPILOT;
          
          return (
            <button
              key={appId}
              onClick={() => handleAppClick(appId)}
              className={`
                group relative w-10 h-10 p-2 rounded hover:bg-white/10 transition-all active:scale-95
                ${(isOpen || (isCopilot && isCopilotOpen)) ? 'bg-white/5' : ''}
              `}
            >
              <div className={`w-full h-full transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                 {config.icon}
              </div>
              
              {/* Active Indicator Dot */}
              {(isOpen || (isCopilot && isCopilotOpen)) && (
                <div className={`
                    absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300
                    ${isActive ? 'w-4 bg-sky-400' : 'w-1.5 bg-gray-400 group-hover:w-3'}
                `} />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex-1 flex items-center justify-end gap-2 pr-2">
        <button className="hover:bg-white/10 p-1 rounded"><ChevronUp size={16} className="text-white/70" /></button>
        
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition-colors cursor-pointer">
           <Wifi size={16} className="text-white" />
           <Volume2 size={16} className="text-white" />
           <Battery size={16} className="text-white" />
        </div>

        <div className="flex flex-col items-end px-2 py-1 hover:bg-white/10 rounded transition-colors cursor-pointer min-w-[70px]">
          <span className="text-xs text-white font-medium leading-none">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-white/80 leading-none mt-1">
             {time.toLocaleDateString()}
          </span>
        </div>

        <button className="hover:bg-white/10 p-2 rounded ml-1">
           <MessageSquare size={16} className="text-white fill-transparent" />
        </button>
        
        {/* Show Desktop Nook */}
        <div className="w-1.5 h-full border-l border-white/10 ml-2 hover:bg-white/10 cursor-pointer" />
      </div>
    </div>
  );
};
