import { ReactNode } from 'react';

export enum AppID {
  COPILOT = 'copilot',
  EDGE = 'edge',
  NOTEPAD = 'notepad',
  CALCULATOR = 'calculator',
  VSCODE = 'vscode',
  SETTINGS = 'settings',
  EXPLORER = 'explorer',
}

export interface AppConfig {
  id: AppID;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
}

export interface WindowState {
  id: AppID;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface OSContextType {
  windows: WindowState[];
  activeWindowId: AppID | null;
  isStartMenuOpen: boolean;
  isCopilotOpen: boolean; // Copilot can be a sidebar or window, usually sidebar in Win11
  launchApp: (appId: AppID) => void;
  closeApp: (appId: AppID) => void;
  minimizeApp: (appId: AppID) => void;
  maximizeApp: (appId: AppID) => void;
  focusApp: (appId: AppID) => void;
  toggleStartMenu: () => void;
  toggleCopilot: () => void;
  updateWindowPosition: (id: AppID, x: number, y: number) => void;
  updateWindowSize: (id: AppID, width: number, height: number) => void;
}
