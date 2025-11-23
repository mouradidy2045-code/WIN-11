import React, { useState } from 'react';

export const NotepadApp = () => {
  const [text, setText] = useState("Welcome to Windows 11 Web!\n\nThis is a fully functional clone using React and Tailwind CSS.\n\nTry opening Copilot to chat with Gemini!");

  return (
    <div className="flex flex-col h-full bg-[#272727] text-white">
      {/* Menu Bar */}
      <div className="flex items-center gap-2 px-1 py-1 bg-[#202020] text-xs border-b border-white/5">
        {['File', 'Edit', 'View'].map(menu => (
          <button key={menu} className="px-3 py-1 hover:bg-white/10 rounded transition-colors text-white/90">
            {menu}
          </button>
        ))}
      </div>
      
      {/* Editor */}
      <textarea
        className="flex-1 w-full h-full bg-[#272727] p-4 text-sm font-mono text-gray-200 resize-none focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
      
      {/* Footer */}
      <div className="h-6 bg-[#202020] border-t border-white/5 flex items-center justify-end px-3 text-[10px] text-white/50 gap-4">
        <span>Ln {text.split('\n').length}, Col {text.length}</span>
        <span>UTF-8</span>
        <span>Windows (CRLF)</span>
      </div>
    </div>
  );
};
