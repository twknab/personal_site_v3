import React from 'react';
import Homepage from './views/Homepage';
import ConfettiOverlay from './components/fun/ConfettiOverlay';
import CursorTrail from './components/fun/CursorTrail';
import ScrollProgress from './components/nav/ScrollProgress';

function App({ recentActivity, techStack }) {
  return (
    <div className="App">
      <ScrollProgress />
      <ConfettiOverlay />
      <CursorTrail />
      <Homepage recentActivity={recentActivity} techStack={techStack} />
    </div>
  );
}

export default App;
