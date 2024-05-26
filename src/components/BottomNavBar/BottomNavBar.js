import React from 'react';
import './BottomNavBar.css';

const BottomNavBar = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="bottom-nav-bar">
      <div className={`nav-item ${currentTab === 'play' ? 'active' : ''}`} onClick={() => setCurrentTab('play')}>
        Play
      </div>
      <div className={`nav-item ${currentTab === 'team' ? 'active' : ''}`} onClick={() => setCurrentTab('team')}>
        Team
      </div>
      <div className={`nav-item ${currentTab === 'statistics' ? 'active' : ''}`} onClick={() => setCurrentTab('statistics')}>
        Statistics
      </div>
      <div className={`nav-item ${currentTab === 'quests' ? 'active' : ''}`} onClick={() => setCurrentTab('quests')}>
        Quests
      </div>
      <div className={`nav-item ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
        Settings
      </div>
    </div>
  );
};

export default BottomNavBar;
