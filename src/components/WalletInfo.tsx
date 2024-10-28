import React from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { JsonContainer } from "./styled/styled";

const WalletInfo: React.FC = () => {
  const { connected, wallet, network, proof } = useTonConnect();

  if (!connected) {
    return <h3>Not connected</h3>;
  }

  return (
    <div className="Container">
      <h3>Wallet Info</h3>

      <pre
        style={{
          backgroundColor: "#f4f4f4",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <JsonContainer>
          {JSON.stringify({ wallet, network, connected, proof }, null, 2)}
        </JsonContainer>
      </pre>
    </div>
  );
};

export default WalletInfo;
