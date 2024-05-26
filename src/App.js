import React, { useState, useEffect } from 'react';
import './App.css';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Play from './pages/Play/play';
import Quests from './pages/Quests/Quests';
import Statistics from './pages/Statistics/Statistics';

const manifestUrl = `${window.location.origin}/tonconnect-manifest.json`;
console.log('Manifest URL:', manifestUrl);  // Add this line to verify
function App() {
  
  const [currentTab, setCurrentTab] = useState('play');
  const [totalTaps, setTotalTaps] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleTap = () => {
    setTotalTaps(prev => prev + 1);
    setBalance(prev => prev + 1);
  };

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const WebApp = window.Telegram.WebApp;
      WebApp.ready();
    }
  }, []);

  return (
    <div className="App">
     <TopNavBar taps={totalTaps} balance={0} />
      {
        currentTab === 'play' && <Play handleTap={handleTap}/>
      }

      {currentTab !== 'play' && currentTab !== 'quests' && currentTab !== 'statistics' &&(
        <div id="content">
          <h1>{currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}</h1>
        </div>
      )}

      {currentTab === 'quests' &&  <div id="content"><Quests /> </div>}
      {currentTab === 'statistics' && <Statistics />}
    
      <BottomNavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default App;

