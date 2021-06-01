import React from 'react';
import PrimaryNavigation from '../components/Navigation/PrimaryNavigation';
import PrimaryFooter from '../components/Navigation/PrimaryFooter';
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
