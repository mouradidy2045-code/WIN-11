import React from 'react';
import { AppID, AppConfig } from './types';
import { 
  Bot, 
  Globe, 
  FileText, 
  Calculator, 
  Code, 
  Settings, 
  Folder 
} from 'lucide-react';
import { CopilotApp } from './apps/Copilot';
import { NotepadApp } from './apps/Notepad';
import { CalculatorApp } from './apps/Calculator';
import { BrowserApp } from './apps/Browser';
import { ExplorerApp } from './apps/Explorer';

export const WALLPAPER_URL = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop";

export const APPS: Record<AppID, AppConfig> = {
  [AppID.COPILOT]: {
    id: AppID.COPILOT,
    title: 'Copilot',
    icon: <Bot className="w-full h-full text-sky-400" />,
    component: <CopilotApp />,
    defaultWidth: 400,
    defaultHeight: 600,
    defaultX: 100,
    defaultY: 50
  },
  [AppID.EDGE]: {
    id: AppID.EDGE,
    title: 'Edge',
    icon: <Globe className="w-full h-full text-blue-500" />,
    component: <BrowserApp />,
    defaultWidth: 900,
    defaultHeight: 600
  },
  [AppID.NOTEPAD]: {
    id: AppID.NOTEPAD,
    title: 'Notepad',
    icon: <FileText className="w-full h-full text-blue-300" />,
    component: <NotepadApp />,
    defaultWidth: 600,
    defaultHeight: 400
  },
  [AppID.CALCULATOR]: {
    id: AppID.CALCULATOR,
    title: 'Calculator',
    icon: <Calculator className="w-full h-full text-orange-400" />,
    component: <CalculatorApp />,
    defaultWidth: 320,
    defaultHeight: 450
  },
  [AppID.EXPLORER]: {
    id: AppID.EXPLORER,
    title: 'File Explorer',
    icon: <Folder className="w-full h-full text-yellow-400" />,
    component: <ExplorerApp />,
    defaultWidth: 800,
    defaultHeight: 500
  },
  [AppID.VSCODE]: {
    id: AppID.VSCODE,
    title: 'VS Code',
    icon: <Code className="w-full h-full text-blue-500" />,
    component: <div className="p-4 text-white">VS Code Mock</div>,
    defaultWidth: 1000,
    defaultHeight: 700
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    icon: <Settings className="w-full h-full text-gray-400" />,
    component: <div className="p-4 text-white">Settings Mock</div>,
    defaultWidth: 800,
    defaultHeight: 600
  },
};
