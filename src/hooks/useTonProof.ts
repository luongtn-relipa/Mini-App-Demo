import { sha256 } from "@ton/crypto";
import { Buffer } from "buffer";
import { randomBytes, sign } from "tweetnacl";

const tonProofPrefix = "ton-proof-item-v2/";
const tonConnectPrefix = "ton-connect";
const allowedDomains = [];
const validAuthTime = 15 * 60;

export async function fetchTonProofPayloadFromBackend(): Promise<
  string | null
> {
  return Buffer.from(randomBytes(32)).toString("hex");
}

export async function checkProofInBackend(
  proof: any,
  address: string
): Promise<boolean> {
  try {
    const isValid = true;
    return isValid;
  } catch (error) {
    console.error("Error check proof:", error);
    return false;
  }
}
