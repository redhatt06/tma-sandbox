import React, { useContext } from "react";
import "./BottomNavBar.css";
import { AuthContext } from "../../context/AuthContext";

const BottomNavBar = ({ currentTab, setCurrentTab }) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="bottom-nav-bar">
      <div
        className={`nav-item ${currentTab === "play" ? "active" : ""}`}
        onClick={() => setCurrentTab("play")}>
        Play
      </div>
      <div
        className={`nav-item ${currentTab === "team" ? "active" : ""}`}
        onClick={() => setCurrentTab("team")}>
        Team
      </div>
      <div
        className={`nav-item ${currentTab === "statistics" ? "active" : ""}`}
        onClick={() => setCurrentTab("statistics")}>
        Statistics
      </div>
      {/* <div className={`nav-item ${currentTab === 'quests' ? 'active' : ''}`} onClick={() => setCurrentTab('quests')}>
        Quests
      </div> */}
      <div
        className={`nav-item ${currentTab === "settings" ? "active" : ""}`}
        onClick={() => setCurrentTab("settings")}>
        Settings
      </div>
      <div
        className={`nav-item ${currentTab === "logout" ? "active" : ""}`}
        onClick={() => logout()}>
        Logout
      </div>
    </div>
  );
};

export default BottomNavBar;
