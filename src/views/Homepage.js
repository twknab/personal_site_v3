import React from 'react';
import PrimaryNavigation from '../components/nav/PrimaryNavigation';
import PrimaryFooter from '../components/nav/PrimaryFooter';
import MainContent from '../components/MainContent';

function Homepage({ recentActivity, techStack, lastCommit }) {

  return (
    <div>
      <PrimaryNavigation />
      <MainContent recentActivity={recentActivity} />
      <PrimaryFooter techStack={techStack} lastCommit={lastCommit} />
    </div>
  );
}

export default Homepage;
