import React, { useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import {
  checkProofInBackend,
  fetchTonProofPayloadFromBackend,
} from "../hooks/useTonProof";

const ConnectWalletButton: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = async () => {
    tonConnectUI.setConnectRequestParameters({ state: "loading" });

    const tonProofPayload: string | null =
      await fetchTonProofPayloadFromBackend();

    if (tonProofPayload) {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: tonProofPayload },
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
      if (
        wallet?.connectItems?.tonProof &&
        "proof" in wallet.connectItems.tonProof
      ) {
        const isValid = await checkProofInBackend(
          wallet.connectItems.tonProof.proof,
          wallet.account.address
        );
        console.log("isValid: ", isValid);
      }
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  return <TonConnectButton />;
};

export default ConnectWalletButton;
