import crypto from "@/utils/crypto";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const sessionData = JSON.stringify(req.body);
  const encryptedSessionData = await crypto.encrypt(sessionData);

  const cookie = serialize("session", encryptedSessionData as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  return new Response("Successfully set cookie!", {
    status: 200,
    headers: { "Set-Cookie": `${cookie}` },
  });
}
