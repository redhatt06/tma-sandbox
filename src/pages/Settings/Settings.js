import React, { useState, useEffect } from "react";
import "./Settings.css";
import UserCard from "../../components/Settings/User/UserCard";
import BridgeList from "../../components/Settings/Bridges/BridgeList";
import { Card } from "@nextui-org/react";
import { GamaBalanceCard } from "../../components/Settings/GamaBalanceCard.js/GameBalanceCard";
function Settings(props) {
  return (
    <div className="grid grid-cols-1 grid-rows-6 sm:grid-cols-1 sm:grid-rows-6 lg:grid-cols-4 gap-8 settings-main-grid overflow-y-auto">
      <div className="flex col-span-2 row-span-6 justify-center h-full min-height-balance-table">
        <UserCard className="h-full" />
      </div>
      <div className="flex flex-col sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-4 col-span-2 h-full">
        <GamaBalanceCard />
      </div>
      <div className="flex flex-col sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 col-span-2 h-full">
        <Card
          className="space-y-5 p-4 h-full overflow-y-auto"
          fullWidth={true}
          radius="lg">
          <BridgeList />
        </Card>
      </div>
    </div>
  );
}

export default Settings;
