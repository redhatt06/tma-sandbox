import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { NextUIProvider } from "@nextui-org/react";
import { Web3ModalProvider } from "./utils/wagmiConfig";
window.Buffer = window.Buffer || require("buffer").Buffer;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <Web3ModalProvider>
        <TonConnectUIProvider
          actionsConfiguration={{
            twaReturnUrl: "https://t.me/tap_brin_bot/play",
          }}
          manifestUrl={`https://redhatt06.github.io/tma-sandbox/tonconnect-manifest.json`}>
          <main className="green-dark text-foreground bg-background">
            <App />
          </main>
        </TonConnectUIProvider>
      </Web3ModalProvider>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
