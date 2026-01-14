// app/api/video/create-meeting/route.ts

import jwt, { SignOptions } from "jsonwebtoken";

export async function POST() {
  const payload = {
    apikey: process.env.VIDEOSDK_API_KEY,
    permissions: ["allow_join"], // or as needed
    version: 2,
    roles: ["crawler"], // For server-side API access
  };

  const options: SignOptions = {
    expiresIn: "1h",
    algorithm: "HS256",
  };

  const token = jwt.sign(payload, process.env.VIDEOSDK_SECRET!, options);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // Increase timeout to 30s

  try {
    const response = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: token, // No 'Bearer ' prefix
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // Optional, for default room
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`Failed to create meeting: ${errorText}`, { status: response.status });
    }

    const data = await response.json();

    return Response.json({ roomId: data.roomId });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(error);
    return new Response("Failed to create meeting due to network error", { status: 500 });
  }
}