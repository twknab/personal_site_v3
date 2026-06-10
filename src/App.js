import React from 'react';
import Homepage from './views/Homepage';
import ConfettiOverlay from './components/fun/ConfettiOverlay';

function App() {
  return (
    <div className="App">
      <ConfettiOverlay />
      <Homepage />
    </div>
  );
}

export default App;
