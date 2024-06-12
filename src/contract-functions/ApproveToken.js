import React, { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { config } from "../utils/wagmiConfig";
import { erc20Abi_bytes32 } from "viem";

const checkAllowance = async (tokenAddress, owner, spender) => {
  const params = {
    address: tokenAddress,
    abi: erc20Abi_bytes32,
    functionName: "allowance",
    args: [owner, spender],
  };
  const data = await readContract(config, params);
  return data;
};
const approveTokens = async (tokenAddress, spender, amount, owner) => {
  try {
    if (checkAllowance(tokenAddress, owner, spender) >= amount) return true;
    const params = {
      address: tokenAddress,
      abi: erc20Abi_bytes32,
      functionName: "approve",
      args: [spender, amount],
    };
    const { request } = await simulateContract(config, params);
    const approveTx = await writeContract(config, request);
    const confirmed = waitForTransactionReceipt(config, {
      hash: approveTx,
      confirmations: 8,
      retryCount: 20,
      retryDelay: 4000,
    });
    if (confirmed) return true;
    return false; // Return balance
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default approveTokens;
