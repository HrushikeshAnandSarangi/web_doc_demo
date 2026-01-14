import jwt from "jsonwebtoken";

export async function GET() {
  const token = jwt.sign(
    { apikey: process.env.VIDEOSDK_API_KEY },
    process.env.VIDEOSDK_SECRET!,
    { expiresIn: "1h" }
  );

  return Response.json({ token });
}
