import React, { useState } from "react";
import { Card, Skeleton, Button, Snippet } from "@nextui-org/react";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { shortenWeb3Address } from "../../../utils/web3-utils";
import BalanceTable from "./BalanceTable/BalanceTable";
import useBalance from "../../../hooks/wallet/useBalance";
import usePolygonBalance from "../../../hooks/wallet/polygon/usePolygonBalance";
import { Tabs, Tab } from "@nextui-org/tabs";
import CoinLogo from "../../CoinLogo/CoinLogo";
import { useAccount } from "wagmi";
export default function UserCard() {
  const [isLoaded, setIsLoaded] = useState(true);

  const [network, setNetwork] = useState("ton");
  const wallet = useTonWallet();
  const address = useTonAddress(true);
  const [balances] = useBalance();
  const [polygonBalance] = usePolygonBalance();
  const { address: polygonAddress, isConnected } = useAccount();

  return (
    <Card
      className="h-full space-y-5 p-4 user-card"
      fullWidth={true}
      radius="lg">
      <Skeleton
        isLoaded={isLoaded}
        className="rounded-lg">
        <div className="h-24 rounded-lg bg-primary-100">
          <div className="flex items-center justify-center m-4 gap-12">
            <p>Ton</p>
            <Snippet
              variant="solid"
              color=""
              codeString={address}
              symbol=""
              size="sm">
              <p>{shortenWeb3Address(address)}</p>
            </Snippet>
          </div>
          {polygonAddress && (
            <div className="flex items-center justify-center m-4 gap-4">
              <p>{"Polygon"}</p>
              <Snippet
                symbol=""
                variant="shadow"
                color="secondary"
                codeString={polygonAddress}
                size="sm">
                {shortenWeb3Address(polygonAddress)}
              </Snippet>
            </div>
          )}
        </div>
      </Skeleton>
      <div className="space-y-3">
        {balances && network === "ton" ? (
          <div className="flex w-full flex-col items-center">
            <BalanceTable balances={balances} />
            <Tabs
              className="mt-2"
              onSelectionChange={(key) => setNetwork(key)}
              selectedKey={network}>
              <Tab
                key="ton"
                title={
                  <div className="flex items-center space-x-2">
                    <CoinLogo icon={"ton"} />
                    <span>TON</span>
                  </div>
                }></Tab>
              <Tab
                key="polygon"
                title={
                  <div className="flex items-center space-x-2">
                    <CoinLogo icon={"matic"} />
                    <span>Polygon</span>
                  </div>
                }></Tab>
            </Tabs>
          </div>
        ) : polygonBalance && network === "polygon" ? (
          <div className="flex w-full flex-col items-center">
            <BalanceTable balances={polygonBalance} />
            <Tabs
              className="mt-2"
              onSelectionChange={(key) => setNetwork(key)}
              selectedKey={network}>
              <Tab
                key="ton"
                title={
                  <div className="flex items-center space-x-2">
                    <CoinLogo icon={"ton"} />
                    <span>TON</span>
                  </div>
                }></Tab>
              <Tab
                key="polygon"
                onClick={() => setNetwork("polygon")}
                title={
                  <div className="flex items-center space-x-2">
                    <CoinLogo icon={"matic"} />
                    <span>Polygon</span>
                  </div>
                }></Tab>
            </Tabs>
          </div>
        ) : (
          <>
            <Skeleton
              isLoaded={isLoaded}
              className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </>
        )}
      </div>
    </Card>
  );
}
