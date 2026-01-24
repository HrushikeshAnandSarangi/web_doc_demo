// app/api/video/create-meeting/route.ts
import jwt from "jsonwebtoken";

export async function POST() {
  const payload = {
    apikey: process.env.VIDEOSDK_API_KEY,
    permissions: ["allow_join", "allow_mod"],
    version: 2,
    roles: ["crawler"],
  };

  const token = jwt.sign(payload, process.env.VIDEOSDK_SECRET!, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customRoomId: "global-meeting-room-2025", // Use our global room ID
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      // Room might already exist, which is fine
      if (response.status === 409) {
        return Response.json({ 
          roomId: "global-meeting-room-2025",
          message: "Room already exists"
        });
      }
      return new Response(`Failed to create meeting: ${errorText}`, { 
        status: response.status 
      });
    }

    const data = await response.json();
    return Response.json({ roomId: data.roomId });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(error);
    return new Response("Failed to create meeting due to network error", { 
      status: 500 
    });
  }
}