import React from 'react';
import PrimaryNavigation from '../components/PrimaryNavigation';
import PrimaryFooter from '../components/PrimaryFooter';
import MainContent from '../components/MainContent';
import { Container } from 'react-bootstrap';
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
