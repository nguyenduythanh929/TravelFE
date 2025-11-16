export const dynamic = "force-dynamic";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);
  if (!request) {
    return Response.json({ message: "No data received" }, { status: 400 });
  }

  return Response.json(data, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${data.token}; Path=/ ; HttpOnly; SameSite=Strict`,
    },
  });
}
