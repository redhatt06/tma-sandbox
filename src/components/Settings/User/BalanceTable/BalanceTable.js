import React, { useState } from "react";
import {
  Card,
  Skeleton,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
} from "@nextui-org/react";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import CoinLogo from "../../../CoinLogo/CoinLogo";
import { shortenDecimalString } from "../../../../utils/web3-utils";

export default function BalanceTable(props) {
  const [isLoaded, setIsLoaded] = useState(true);
  const balances = props.balances;

  return (
    <Table
      isStriped
      aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Symbol</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Balance</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <CoinLogo
              icon={balances.coin.icon}
              symbol={balances.coin.symbol}
            />
          </TableCell>
          <TableCell>{balances.coin.name}</TableCell>
          <TableCell>{shortenDecimalString(balances.coin.balance)}</TableCell>
        </TableRow>
        {balances.tokens.map((token, index) => {
          return (
            <TableRow key={index + 2}>
              <TableCell>
                <CoinLogo
                  icon={token.icon}
                  symbol={token.symbol}
                />
              </TableCell>
              <TableCell>{token.name}</TableCell>
              <TableCell>{shortenDecimalString(token.balance)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
