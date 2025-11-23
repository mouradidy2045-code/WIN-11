import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { WindowState } from '../types';
import { useOS } from '../context/OSContext';
import { APPS } from '../constants';

interface WindowProps {
  windowState: WindowState;
}

export const Window: React.FC<WindowProps> = ({ windowState }) => {
  const { id, x, y, width, height, isMaximized, zIndex, isMinimized } = windowState;
  const { focusApp, closeApp, minimizeApp, maximizeApp, updateWindowPosition } = useOS();
  const appConfig = APPS[id];
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusApp(id);
    if (isMaximized) return;
    
    // Only drag if clicking header
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
  };

  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      updateWindowPosition(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }
  }, [isDragging, isMaximized, dragOffset, id, updateWindowPosition]);

  const handleGlobalMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    } else {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleGlobalMouseMove, handleGlobalMouseUp]);

  if (isMinimized) return null;

  const style: React.CSSProperties = isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', transform: 'none' }
    : { top: y, left: x, width, height };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden
        transition-all duration-75 ease-out
        ${isMaximized ? 'rounded-none' : 'rounded-lg'}
      `}
      style={{ ...style, zIndex }}
      onMouseDown={() => focusApp(id)}
    >
      {/* Title Bar */}
      <div 
        className="h-9 min-h-[36px] flex items-center justify-between px-3 select-none cursor-default bg-transparent"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-xs text-white/80">
          <div className="w-4 h-4">{appConfig.icon}</div>
          <span>{appConfig.title}</span>
        </div>
        <div className="flex items-center window-controls h-full">
          <button onClick={(e) => { e.stopPropagation(); minimizeApp(id); }} className="h-full px-3 hover:bg-white/10 transition-colors text-white">
            <Minus size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); maximizeApp(id); }} className="h-full px-3 hover:bg-white/10 transition-colors text-white">
            {isMaximized ? <Maximize2 size={12} className="rotate-180" /> : <Square size={12} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); closeApp(id); }} className="h-full px-3 hover:bg-red-500 transition-colors text-white rounded-tr-lg">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden bg-gray-900/50">
        {appConfig.component}
      </div>
    </div>
  );
};
