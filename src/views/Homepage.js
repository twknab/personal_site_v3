import React from 'react';
import PrimaryNavigation from '../components/nav/PrimaryNavigation';
import PrimaryFooter from '../components/nav/PrimaryFooter';
import MainContent from '../components/MainContent';

function Homepage({ recentActivity, techStack }) {

  return (
    <div>
      <PrimaryNavigation />
      <MainContent recentActivity={recentActivity} />
      <PrimaryFooter techStack={techStack} />
    </div>
  );
}

export default Homepage;
