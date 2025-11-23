import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCcw, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const CopilotApp = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your Windows Copilot powered by Gemini. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Create chat instance to maintain history implicitly if needed, 
      // but simple generateContent with streaming is robust for single queries.
      // We'll use a chat session for context.
      
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessageStream({ message: userMsg });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
         const chunkText = chunk.text;
         fullResponse += chunkText;
         setMessages(prev => {
            const newHistory = [...prev];
            const lastMsg = newHistory[newHistory.length - 1];
            if (lastMsg.role === 'model') {
                lastMsg.text = fullResponse;
            }
            return newHistory;
         });
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-sans">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
               <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-sky-400" />
               </div>
            )}
            <div className={`
              max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-[#2b2b2b] text-gray-100 rounded-tl-sm border border-white/5'}
            `}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
               <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                  <User size={16} className="text-white" />
               </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles size={16} className="text-sky-400" />
               </div>
               <div className="bg-[#2b2b2b] rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#252525] border-t border-white/5">
        <div className="relative flex items-end gap-2 bg-[#1e1e1e] border border-white/10 rounded-xl p-2 focus-within:ring-1 focus-within:ring-sky-500/50 transition-all">
           <textarea
            className="w-full bg-transparent text-sm text-white placeholder-white/40 resize-none focus:outline-none max-h-32 py-2 pl-2"
            rows={1}
            placeholder="Ask Copilot anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white mb-0.5"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-[10px] text-center mt-2 text-white/30 flex items-center justify-center gap-1">
           <Bot size={10} />
           <span>AI generated content may be inaccurate.</span>
        </div>
      </div>
    </div>
  );
};
