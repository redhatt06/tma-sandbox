import React, { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from "tonweb";

const coin = {
  symbol: "TON",
  name: "TONCOIN",
  icon: "ton",
  balance: 0,
};
const jettons = [
  // List of Jetton contract addresses
  {
    jettonAddress: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
    jettonSymbol: "USDT",
    jettonName: "Tether USD",
    jettonIcon: "usdt",
  },
  {
    jettonAddress: "EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT",
    jettonSymbol: "NOT",
    jettonName: "NOT Coin",
    jettonIcon: "not",
  },
];
const useBalance = () => {
  const [balances, setBalances] = useState({ coin: coin, tokens: [] });
  const [address, setAddress] = useState(null);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const tonWallet = useTonWallet();

  // mainnet
  const tonweb = new TonWeb(
    new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
      apiKey:
        "1d946767714d15b6f1339e87ccfc5cb4b5024e613b2325d5025bd48547c0d38d",
    })
  );

  //testnet
  // const tonweb = new TonWeb(
  //   new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
  //     apiKey:
  //       "5978adeb12f1f039936092e4800771e011e53d9ba5bb62436a4465b315f12198",
  //   })
  // );

  const JettonWallet = TonWeb.token.jetton.JettonWallet;
  const JettonMinter = TonWeb.token.jetton.JettonMinter;

  useEffect(() => {
    if (tonWallet) {
      setAddress(tonWallet.account.address);
      fetchBalances(tonWallet.account.address);
    }
  }, []);

  const fetchBalances = async (address) => {
    try {
      // Fetch coin balance
      const balance = await tonweb.getBalance(new TonWeb.Address(address));
      console.log("balance: " + balance);
      // Fetch token balances (assuming you have token addresses or identifiers)
      const tokens = await fetchTokenBalances(address);

      setBalances({
        coin: {
          symbol: "TON",
          name: "TONCOIN",
          icon: "ton",
          balance: balance ? TonWeb.utils.fromNano(balance) : "0",
        },
        tokens,
      });
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const fetchTokenBalances = async (address) => {
    // Implement fetching token balances from the wallet
    // This requires interacting with specific token contracts
    // Example: Fetching Jetton balances
    try {
      const jettonBalances = await getJettonBalances(address);
      return jettonBalances;
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const getJettonBalances = async (address) => {
    const balances = await Promise.all(
      jettons.map(async (jetton) => {
        try {
          const balance = await fetchJettonBalance(
            jetton.jettonAddress,
            address
          );
          return {
            address: jetton.jettonAddress,
            name: jetton.jettonName,
            symbol: jetton.jettonSymbol,
            icon: jetton.jettonIcon,
            balance: balance ? TonWeb.utils.fromNano(balance) : "0",
          };
        } catch (error) {
          console.error(
            `Error fetching balance for ${jetton.jettonAddress}:`,
            error
          );
          return {
            address: jetton.jettonAddress,
            name: jetton.jettonName,
            symbol: jetton.jettonSymbol,
            icon: jetton.jettonIcon,
            balance: 0,
          };
        }
      })
    );

    return balances;
  };

  const fetchJettonBalance = async (jettonAddress, walletAddress) => {
    try {
      const contractWallet = new JettonMinter(tonweb.provider, {
        address: new TonWeb.Address(jettonAddress),
      });
      const jettonWalletAddress = await contractWallet.getJettonWalletAddress(
        new TonWeb.Address(walletAddress)
      );
      console.log(jettonWalletAddress.toString(true));
      const jettonWallet = new JettonWallet(tonweb.provider, {
        address: new TonWeb.Address(jettonWalletAddress),
      });
      console.log(jettonWallet);
      const jettonBalance = (await jettonWallet.getData()).balance;

      return jettonBalance; // Return balance
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  return [balances];
};

export default useBalance;
