import * as jose from "jose";

export const verify = async (token: string) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) return;
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

    const data = await jose.jwtVerify(token, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
