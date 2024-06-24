import React, { useState, useContext, useEffect } from "react";
import { useConnect, useSignMessage, useAccount } from "wagmi";
import { Tabs, Tab, Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import {
  TonConnectButton,
  TonConnectUI,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { config } from "../../utils/wagmiConfig";

const Auth = () => {
  const { loginWallet, loginEmail, loginTelegram, registerEmail, error, user } =
    useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("ethereum");
  const [signedMessage, setSignedMessage] = useState("");
  const [customErr, setCustomErr] = useState("");
  const tonConnectUI = useTonConnectUI();
  const { address: ethereumAddress, isConnected: isEthereumConnected } =
    useAccount();
  const tonAddress = useTonAddress();
  const isTonConnected = Boolean(tonAddress);

  const { signMessageAsync } = useSignMessage(config, {
    message: "Welcome to our community",
  });

  const handleEthereumLogin = async () => {
    try {
      const signature = await signMessageAsync({
        message: "Welcome to our community",
        account: ethereumAddress,
      });
      setSignedMessage(signature);
      const response = await loginWallet({
        network: "matic",
        address: ethereumAddress,
        message: "Welcome to our community",
        signature,
      });
    } catch (error) {
      setCustomErr(error);
      console.error("Ethereum login failed", error);
    }
  };

  const handleTonLogin = async () => {
    try {
      const signature = "dummy";
      setSignedMessage(signature);
      const response = await loginWallet({
        network: "ton",
        address: tonAddress,
        message: "Welcome to our community",
        signature,
      });
    } catch (error) {
      setCustomErr(error);
      console.error("Ethereum login failed", error);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await loginEmail({ email, password });
    } catch (error) {
      console.error("Email login failed", error);
    }
  };

  const handleEmailRegister = async (email, password) => {
    try {
      await registerEmail({ email, password });
    } catch (error) {
      console.error("Email registration failed", error);
    }
  };

  const handleTelegramLogin = async (telegramId) => {
    try {
      await loginTelegram({ telegramId });
    } catch (error) {
      console.error("Telegram login failed", error);
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen bg-gray-100">
      <Box className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="auth tabs">
          <Tab
            label="Ethereum Wallet"
            value="ethereum"
          />
          <Tab
            label="TON Wallet"
            value="ton"
          />
          {/* <Tab
            label="Email"
            value="email"
          />
          <Tab
            label="Telegram"
            value="telegram"
          /> */}
        </Tabs>

        {activeTab === "ethereum" && (
          <Box className="mt-4">
            <w3m-button />
            {isEthereumConnected ? (
              <>
                <Typography className="mt-4">
                  Welcome to our community
                </Typography>
                {/* <Typography className="mt-4">{error}</Typography>
                <Typography className="mt-4">{JSON.stringify(user)}</Typography>
                <Typography className="mt-4">{customErr}</Typography> */}

                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  onClick={handleEthereumLogin}>
                  Sign Message
                </Button>
              </>
            ) : (
              <Typography className="mt-4">
                Connect your wallet to proceed
              </Typography>
            )}
          </Box>
        )}
        {activeTab === "ton" && (
          <Box className="mt-4">
            <TonConnectButton style={{ float: "right" }} />
            {isTonConnected ? (
              <>
                <Typography className="mt-4">
                  Welcome to our community
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  onClick={handleTonLogin}>
                  Sign Message
                </Button>
              </>
            ) : (
              <Typography className="mt-4">
                Connect your wallet to proceed
              </Typography>
            )}
          </Box>
        )}
        {activeTab === "email" && (
          <Box className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmailLogin(e.target.email.value, e.target.password.value);
              }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Login
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleEmailRegister(
                    e.target.email.value,
                    e.target.password.value
                  );
                }}>
                Register
              </Button>
            </form>
          </Box>
        )}
        {activeTab === "telegram" && (
          <Box className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTelegramLogin(e.target.telegramId.value);
              }}>
              <TextField
                label="Telegram ID"
                name="telegramId"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Login
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Auth;
