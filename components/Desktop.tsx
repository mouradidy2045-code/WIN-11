import React from 'react';
import { useOS } from '../context/OSContext';
import { APPS, WALLPAPER_URL } from '../constants';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { Window } from './Window';
import { AppID } from '../types';
import { CopilotApp } from '../apps/Copilot';

export const Desktop = () => {
  const { windows, launchApp, isCopilotOpen, toggleCopilot } = useOS();

  // Desktop Icons
  const desktopApps = [AppID.EXPLORER, AppID.EDGE, AppID.NOTEPAD, AppID.CALCULATOR];

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
    >
      {/* Desktop Icons Grid */}
      <div className="absolute top-0 left-0 bottom-12 w-full p-2 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-2 content-start justify-start z-0">
        {desktopApps.map(appId => {
          const app = APPS[appId];
          return (
            <button
              key={appId}
              onDoubleClick={() => launchApp(appId)}
              className="w-24 h-24 flex flex-col items-center justify-center gap-1 rounded hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors group text-shadow"
            >
              <div className="w-12 h-12 text-white/90 drop-shadow-lg">
                {app.icon}
              </div>
              <span className="text-xs text-white text-center drop-shadow-md line-clamp-2 px-1">
                {app.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Windows Layer */}
      {windows.map(windowState => (
        <Window key={windowState.id} windowState={windowState} />
      ))}

      {/* Copilot Side Panel (Special Case) */}
      <div className={`
        absolute top-0 right-0 bottom-12 w-[400px] bg-[#1e1e1e]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[9998] transform transition-transform duration-300 ease-in-out
        ${isCopilotOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
          <div className="h-full flex flex-col">
              <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
                  <span className="font-semibold text-white">Copilot</span>
                  <button onClick={toggleCopilot} className="text-white/50 hover:text-white">Close</button>
              </div>
              <div className="flex-1 relative">
                  <CopilotApp />
              </div>
          </div>
      </div>

      <StartMenu />
      <Taskbar />
    </div>
  );
};
