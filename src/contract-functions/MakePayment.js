import React, { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import {
  getAccount,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { config } from "../utils/wagmiConfig";
import { erc20Abi, formatEther, parseEther } from "viem";
import { PaymentGateContract } from "../smart-contracts/PaymentGate/PaymentGate";
import { PriceApi } from "../api/payments/price-api-get";
import BigNumber from "bignumber.js";
import { AuthApi } from "../api/user-api";
import { polygon } from "viem/chains";

const tokenSymbols = {
  MATIC: "MATIC",
  USDT: "USDT",
  BRIN: "BRIN",
};
const makePayment = async (paymentId, tokenSymbol, amountOfXToken) => {
  try {
    let value;
    const slippage = parseEther("0.01");
    if (tokenSymbol === "MATIC") {
      const estimatedCost = await PriceApi.getEstimatedCost({
        paymentTokenType: tokenSymbol,
        amountOfXToken,
      });
      value = (parseEther(formatEther(estimatedCost)) + slippage).toString();
    } else {
      value = parseEther("0");
    }
    const account = getAccount(config);
    const params = {
      address: PaymentGateContract.address,
      abi: PaymentGateContract.abi,
      functionName: "makePayment",
      args: [paymentId, tokenSymbol, amountOfXToken],
      value,
      chain: polygon,
      account: account.address,
    };

    const { request } = await simulateContract(config, params);
    const hash = await writeContract(config, request);
    const confirmed = waitForTransactionReceipt(config, { hash });
    if (confirmed) return hash;
    return false; // Return balance
  } catch (err) {
    await AuthApi.postLog({ log: JSON.stringify(err) });
    console.log(err);
    return false;
  }
};

export default makePayment;
