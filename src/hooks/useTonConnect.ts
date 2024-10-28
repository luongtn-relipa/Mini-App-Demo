import { TonProofItemReply } from "@tonconnect/protocol";
import { Sender, SenderArguments } from "ton-core";
import { Account, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

export function useTonConnect(): {
  sender: Sender;
  account: Account | null;
  tonProof: TonProofItemReply | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    account: wallet?.account ?? null,
    tonProof: wallet?.connectItems?.tonProof ?? null,
  };
}
