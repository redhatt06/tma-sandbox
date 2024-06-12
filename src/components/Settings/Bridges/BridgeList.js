import React from "react";
import { Button, Listbox, ListboxItem, cn } from "@nextui-org/react";
import CoinLogo from "../../CoinLogo/CoinLogo";

export default function BridgeList() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div>
      <h1 className="m-1">Bridges</h1>
      <div className="text-center m-4">
        <p>Choose bridge network to transfer tokens from chosen network</p>
        <div className="flex items-center justify-center gap-4 m-2">
          <Button
            color="secondary"
            startContent={
              <CoinLogo
                icon={"matic"}
                className={iconClasses}
              />
            }>
            {" "}
            Polygon
          </Button>
          <Button
            color="default"
            startContent={
              <CoinLogo
                icon={"eth"}
                className={iconClasses}
              />
            }>
            {" "}
            Ethereum
          </Button>
        </div>
      </div>
    </div>
  );
}
