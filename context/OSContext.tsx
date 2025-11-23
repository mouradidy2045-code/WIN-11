import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppID, WindowState, OSContextType } from '../types';
import { APPS } from '../constants';

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const focusApp = useCallback((appId: AppID) => {
    setActiveWindowId(appId);
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === appId ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w
    ));
    // If it's a window, we might want to close start menu
    if (appId !== AppID.COPILOT) setIsStartMenuOpen(false);
  }, [zIndexCounter]);

  const launchApp = useCallback((appId: AppID) => {
    // If Copilot, toggle special state
    if (appId === AppID.COPILOT) {
      toggleCopilot();
      return;
    }

    setWindows(prev => {
      const existing = prev.find(w => w.id === appId);
      if (existing) {
        // Just focus
        return prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w);
      }
      // Open new
      const appConfig = APPS[appId];
      // Random offset for new windows so they don't stack perfectly
      const offset = prev.length * 20;
      return [...prev, {
        id: appId,
        x: (appConfig.defaultX || 100) + offset,
        y: (appConfig.defaultY || 50) + offset,
        width: appConfig.defaultWidth || 800,
        height: appConfig.defaultHeight || 600,
        isMinimized: false,
        isMaximized: false,
        zIndex: zIndexCounter + 1
      }];
    });
    setActiveWindowId(appId);
    setZIndexCounter(c => c + 1);
    setIsStartMenuOpen(false);
  }, [zIndexCounter]);

  const closeApp = useCallback((appId: AppID) => {
    setWindows(prev => prev.filter(w => w.id !== appId));
    if (activeWindowId === appId) setActiveWindowId(null);
  }, [activeWindowId]);

  const minimizeApp = useCallback((appId: AppID) => {
    setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  }, []);

  const maximizeApp = useCallback((appId: AppID) => {
    setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w));
    focusApp(appId);
  }, [focusApp]);

  const updateWindowPosition = useCallback((id: AppID, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const updateWindowSize = useCallback((id: AppID, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  }, []);

  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
    setIsCopilotOpen(false);
  }, []);

  const toggleCopilot = useCallback(() => {
    setIsCopilotOpen(prev => !prev);
    setIsStartMenuOpen(false);
  }, []);

  return (
    <OSContext.Provider value={{
      windows,
      activeWindowId,
      isStartMenuOpen,
      isCopilotOpen,
      launchApp,
      closeApp,
      minimizeApp,
      maximizeApp,
      focusApp,
      toggleStartMenu,
      toggleCopilot,
      updateWindowPosition,
      updateWindowSize
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within OSProvider");
  return context;
};
