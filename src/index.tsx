import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = `${
  import.meta.env.VITE_APP_DOMAIN
}/tonconnect-manifest.json`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
