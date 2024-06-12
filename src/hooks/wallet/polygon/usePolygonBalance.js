import React, { useEffect, useState } from "react";
import { useBalance, useReadContracts, useAccount } from "wagmi";
import { formatUnits } from "viem";
const coin = {
  symbol: "MATIC",
  name: "Polygon MATIC",
  icon: "matic",
  balance: 0,
};

const balanceOfABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
];
const tokens = [
  {
    tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    tokenSymbol: "USDT",
    tokenName: "Tether USD",
    tokenIcon: "usdt",
    decimals: 6,
    abi: balanceOfABI,
    functionName: "balanceOf",
  },
  {
    tokenAddress: "0xBC0b7dE316f4E57C677370CCD3A36697D6Fc5De2",
    tokenSymbol: "BRIN",
    tokenName: "Bringold",
    tokenIcon: "brin",
    decimals: 18,
    abi: balanceOfABI,
    functionName: "balanceOf",
  },
];
const usePolygonBalance = () => {
  const [polygonBalance, setPolygonBalance] = useState({
    coin: coin,
    tokens: [],
  });
  const { address: wallet } = useAccount();

  const { data: maticBalance, isFetched: isFetchedMaticBalance } = useBalance({
    address: wallet,
  });
  const { data: tokenBalances, isFetched: isFetchedTokenBalances } =
    useReadContracts({
      contracts: tokens.map((token) => {
        return {
          address: token.tokenAddress,
          functionName: token.functionName,
          abi: token.abi,
          args: [wallet],
        };
      }),
    });

  useEffect(() => {
    if (isFetchedMaticBalance && isFetchedTokenBalances && wallet)
      setPolygonBalance({
        coin: {
          name: coin.name,
          symbol: coin.symbol,
          icon: coin.icon,
          balance: maticBalance
            ? formatUnits(maticBalance.value, maticBalance.decimals)
            : 0,
        },
        tokens: tokens.map((token, index) => {
          return {
            address: token.tokenAddress,
            name: token.tokenName,
            symbol: token.tokenSymbol,
            icon: token.tokenIcon,
            balance: formatUnits(
              tokenBalances[index].result,
              tokens[index].decimals
            ),
          };
        }),
      });
  }, [isFetchedTokenBalances, isFetchedMaticBalance]);

  return [polygonBalance];
};

export default usePolygonBalance;
