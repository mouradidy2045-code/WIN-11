import React from 'react';
import { OSProvider } from './context/OSContext';
import { Desktop } from './components/Desktop';

const App = () => {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
};

export default App;
