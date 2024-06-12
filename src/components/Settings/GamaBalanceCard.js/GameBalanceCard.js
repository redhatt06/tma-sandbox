import { Card } from "@nextui-org/react";
import { React, useContext, useState } from "react";
import PaymentModal from "./PaymentModal/PaymentModal";
import { AuthContext } from "../../../context/AuthContext";
import BigNumber from "bignumber.js";
import { formatEther } from "viem";

export function GamaBalanceCard(props) {
  const { user } = useContext(AuthContext);
  return (
    <Card
      className="h-full space-y-5 p-4 overflow-y-auto"
      fullWidth={true}
      radius="lg">
      <h1 className="mt-2">Game Balance</h1>
      <div className="flex text-alignt-left gap-4 mt-4 text-secondary">
        <p>GameCoins: {formatEther(BigNumber(user.balance))} X</p>
      </div>

      <div className="flex items-center justify-center">
        <PaymentModal />
      </div>
    </Card>
  );
}
