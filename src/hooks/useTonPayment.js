import TonWeb, { HttpProvider } from "tonweb";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import { hexToBytes } from "viem";
import { TonPaymentContractWrapper } from "../classes/TonPaymentContractWrapper";
import { Address, beginCell, toNano } from "@ton/core";

export const useTonPayment = () => {
  const tonConnectUI = useTonConnectUI();
  const [makeTonPayment, setMakeTonPayment] = useState(null);

  useEffect(() => {
    if (tonConnectUI.length === 0) return;

    const provider = tonConnectUI[0];
    const tonweb = new TonWeb(
      new HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")
    );
    const contractAddress = "EQCdAlvCQb643eMJYQoCgQw1VYsWUf_Uqr1eRepXxgk5QBfn";
    const contractCodeHex =
      "b5ee9c72410102010018000114ff00f4a413f4bcf2c80b010012d330d0d3033071b0dc045cb0dc";
    const senderAddress = tonConnectUI[0].account.address;
    const XtokenPriceInTonCoin = 150000; // example amount in nanoton

    const makeTonPayment = async (paymentId, amountOfXToken) => {
      try {
        const valCell = beginCell()
          .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
          .storeStringTail(paymentId.toString())
          // .storeAddress(Address.parse(senderAddress))
          // .storeUint(paymentId, 64)
          // .storeUint(amountOfXToken, 64)
          // .storeUint(toNano(0.008), 64)
          .endCell();
        const result = await provider.sendTransaction({
          from: senderAddress,
          validUntil: Math.floor(Date.now() / 1000) + 100000,
          messages: [
            {
              payload: valCell.toBoc().toString("base64"),
              address: contractAddress,
              amount: XtokenPriceInTonCoin * Number(amountOfXToken).toString(),
            },
          ],
        });
        console.log(result);
      } catch (error) {
        console.error("Error calling main function:", error);
      }
    };

    setMakeTonPayment(() => makeTonPayment);
  }, []);

  return { makeTonPayment };
};
