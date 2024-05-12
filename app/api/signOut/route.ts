import { cookies } from "next/headers";

export async function POST(req: Request) {
  cookies().delete("session");

  return new Response("Successfully deleted cookie!", {
    status: 200,
  });
}
