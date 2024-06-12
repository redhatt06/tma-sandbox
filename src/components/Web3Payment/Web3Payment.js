import { Card } from "@nextui-org/react";
import { React, useState } from "react";
import PaymentModal from "./PaymentModal/PaymentModal";

export function Web3Payment(props) {
  return (
    <Card
      className="h-full space-y-5 p-4 overflow-y-auto"
      fullWidth={true}
      radius="lg">
      <h1 className="mt-2">Game Balance</h1>
      <div className="flex text-alignt-left gap-4 mt-4">
        <p>GameCoins: B</p>
      </div>

      <div className="flex items-center justify-center">
        <PaymentModal />
      </div>
    </Card>
  );
}
