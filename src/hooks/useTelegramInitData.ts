import crypto from "crypto";

export function decodeInitData(initData: string) {
  const params = new URLSearchParams(initData);
  const data: Record<string, any> = Object.fromEntries(params.entries());

  Object.keys(data).forEach((key) => {
    try {
      data[key] = JSON.parse(data[key]);
    } catch (error) {}
  });

  return data;
}

export function verifyInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const { hash, ...data } = Object.fromEntries(params.entries());

  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken);
  const _hash = crypto
    .createHmac("sha256", secretKey.digest())
    .update(dataCheckString)
    .digest("hex");

  return _hash === hash;
}
