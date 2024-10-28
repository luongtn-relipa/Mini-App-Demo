import React, { useEffect, useState } from "react";
import { JsonContainer } from "./styled/styled";
import { decodeInitData, verifyInitData } from "../hooks/useTelegramInitData";
import WebApp from "@twa-dev/sdk";

const InitDataInfo: React.FC = () => {
  const [decodedData, setDecodedData] = useState<Record<string, string> | null>(
    null
  );
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const initData = WebApp.initData;
  const botToken = import.meta.env.VITE_BOT_TOKEN;

  useEffect(() => {
    const data = decodeInitData(initData);
    setDecodedData(data);

    const valid = verifyInitData(initData, botToken);
    setIsValid(valid);
  }, [initData, botToken]);

  return (
    <div className="Container">
      <h3>Init Data Info</h3>

      <pre
        style={{
          backgroundColor: "#f4f4f4",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <JsonContainer>
          {JSON.stringify({ ...decodedData, isValid }, null, 2)}
        </JsonContainer>
      </pre>
    </div>
  );
};

export default InitDataInfo;
