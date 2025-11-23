import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op);
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const fullEq = equation + ' ' + display;
      // eslint-disable-next-line no-eval
      const result = eval(fullEq.replace('×', '*').replace('÷', '/')); 
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const btnClass = "h-12 rounded bg-[#323232] hover:bg-[#3b3b3b] flex items-center justify-center text-sm font-medium transition-colors border border-white/5 active:scale-95";
  const opClass = "h-12 rounded bg-[#323232] hover:bg-sky-500 hover:text-white flex items-center justify-center text-sm font-medium transition-colors border border-white/5 active:scale-95";
  const equalClass = "h-12 rounded bg-sky-500 hover:bg-sky-400 text-black flex items-center justify-center text-sm font-bold transition-colors active:scale-95";

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white p-1">
      <div className="h-32 flex flex-col items-end justify-end px-4 pb-2">
        <div className="text-white/60 text-sm h-6">{equation}</div>
        <div className="text-5xl font-semibold tracking-tight overflow-hidden">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-1 flex-1">
        <button className={opClass} onClick={handleClear}>C</button>
        <button className={opClass}>CE</button>
        <button className={opClass} onClick={() => setDisplay(prev => String(Number(prev) * -1))}>+/-</button>
        <button className={opClass} onClick={() => handleOp('÷')}>÷</button>

        <button className={btnClass} onClick={() => handleNum('7')}>7</button>
        <button className={btnClass} onClick={() => handleNum('8')}>8</button>
        <button className={btnClass} onClick={() => handleNum('9')}>9</button>
        <button className={opClass} onClick={() => handleOp('×')}>×</button>

        <button className={btnClass} onClick={() => handleNum('4')}>4</button>
        <button className={btnClass} onClick={() => handleNum('5')}>5</button>
        <button className={btnClass} onClick={() => handleNum('6')}>6</button>
        <button className={opClass} onClick={() => handleOp('-')}>-</button>

        <button className={btnClass} onClick={() => handleNum('1')}>1</button>
        <button className={btnClass} onClick={() => handleNum('2')}>2</button>
        <button className={btnClass} onClick={() => handleNum('3')}>3</button>
        <button className={opClass} onClick={() => handleOp('+')}>+</button>

        <button className={btnClass} onClick={() => handleNum('0')}>0</button>
        <button className={btnClass} onClick={() => handleNum('.')}>.</button>
        <button className={equalClass} onClick={handleEqual} style={{ gridColumn: 'span 2' }}>=</button>
      </div>
    </div>
  );
};
