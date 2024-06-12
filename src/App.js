import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import Play from "./pages/Play/play";
import Quests from "./pages/Quests/Quests";
import Statistics from "./pages/Statistics/Statistics";
import Settings from "./pages/Settings/Settings";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [currentTab, setCurrentTab] = useState("settings");
  const [totalTaps, setTotalTaps] = useState(0);

  const handleTap = () => {
    setTotalTaps((prev) => prev + 1);
  };

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const WebApp = window.Telegram.WebApp;
      WebApp.ready();
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="/"
            element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <div className="App">
                  <TopNavBar taps={totalTaps} />
                  {currentTab === "play" && <Play handleTap={handleTap} />}

                  {currentTab !== "play" &&
                    currentTab !== "quests" &&
                    currentTab !== "statistics" &&
                    currentTab !== "settings" && (
                      <div id="content">
                        <h1>
                          {currentTab.charAt(0).toUpperCase() +
                            currentTab.slice(1)}
                        </h1>
                      </div>
                    )}

                  {currentTab === "quests" && (
                    <div id="content">
                      <Quests />{" "}
                    </div>
                  )}
                  {currentTab === "statistics" && <Statistics />}
                  {currentTab === "settings" && (
                    <div
                      id="content"
                      className="flex items-center justify-center">
                      <Settings />
                    </div>
                  )}

                  <BottomNavBar
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                  />
                </div>
              }
            />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/auth" />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
