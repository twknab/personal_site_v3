import React from 'react';
import PrimaryNavigation from '../components/nav/PrimaryNavigation';
import PrimaryFooter from '../components/nav/PrimaryFooter';
import MainContent from '../components/MainContent';

function Homepage() {

  return (
    <div>
      <PrimaryNavigation />
      <MainContent />
      <PrimaryFooter />
    </div>
  );
}

export default Homepage;
