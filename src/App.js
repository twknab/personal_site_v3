import React from 'react';
import Homepage from './views/Homepage';
import ConfettiOverlay from './components/fun/ConfettiOverlay';
import CursorTrail from './components/fun/CursorTrail';

function App({ recentActivity, techStack }) {
  return (
    <div className="App">
      <ConfettiOverlay />
      <CursorTrail />
      <Homepage recentActivity={recentActivity} techStack={techStack} />
    </div>
  );
}

export default App;
