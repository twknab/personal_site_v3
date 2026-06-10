import React from 'react';
import Homepage from './views/Homepage';
import ConfettiOverlay from './components/fun/ConfettiOverlay';
import CursorTrail from './components/fun/CursorTrail';

function App() {
  return (
    <div className="App">
      <ConfettiOverlay />
      <CursorTrail />
      <Homepage />
    </div>
  );
}

export default App;
