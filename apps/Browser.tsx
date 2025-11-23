import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search } from 'lucide-react';

export const BrowserApp = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputUrl, setInputUrl] = useState('https://google.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http')) {
      target = 'https://' + target;
    }
    // Very basic protection/handling for iframe display options
    // Note: Many sites block iframes (X-Frame-Options). 
    // We default to Google's embeddable version for demo.
    setUrl(target);
  };

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 p-2 bg-[#2b2b2b] border-b border-white/5">
        <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-white/10 rounded-full text-white/70"><ArrowLeft size={16} /></button>
            <button className="p-1.5 hover:bg-white/10 rounded-full text-white/70"><ArrowRight size={16} /></button>
            <button className="p-1.5 hover:bg-white/10 rounded-full text-white/70"><RotateCw size={14} /></button>
        </div>
        
        <form onSubmit={handleNavigate} className="flex-1">
           <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                <Search size={14} />
              </div>
              <input 
                className="w-full bg-[#1e1e1e] border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-gray-200 focus:outline-none focus:border-sky-500/50 focus:bg-[#1a1a1a] transition-all"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
           </div>
        </form>
      </div>
      
      {/* Content */}
      <div className="flex-1 relative bg-white">
        <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
        {/* Overlay for demo explanation regarding iframes */}
        <div className="absolute top-0 left-0 w-full h-8 bg-yellow-100 text-yellow-800 text-xs flex items-center justify-center opacity-80 pointer-events-none">
            Note: Only websites allowing iframe embedding will load here.
        </div>
      </div>
    </div>
  );
};
