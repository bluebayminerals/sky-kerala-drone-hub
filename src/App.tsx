import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Homepage } from './components/Homepage';
import { ArtistRoster } from './components/ArtistRoster';
import { EventRadar } from './components/EventRadar';
import { ArtistOnboarding } from './components/ArtistOnboarding';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Homepage setCurrentTab={setCurrentTab} />;
      case 'roster':
        return <ArtistRoster />;
      case 'radar':
        return <EventRadar />;
      case 'onboard':
        return <ArtistOnboarding />;
      default:
        return <Homepage setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderContent()}
    </div>
  );
}

export default App;
