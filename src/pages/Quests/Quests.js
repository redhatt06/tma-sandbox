import React from 'react';
import questsData from './quests.json';
import './Quests.css';

const Quests = () => {
  return (
    <div className="quests-container">
      <div className="quests-list">
        {questsData.map(quest => (
          <div key={quest.id} className="quest-item">
            <div className="quest-name">{quest.name}</div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${(quest.progress / quest.goal) * 100}%` }}
              ></div>
            </div>
            <div className="quest-progress">
              {quest.progress}/{quest.goal} completed
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quests;
