// app/api/video/token/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // Generate unique token for each request
    const payload = {
      apikey: process.env.VIDEOSDK_API_KEY,
      permissions: ["allow_join", "allow_mod"],
      version: 2,
      // Add unique identifier to prevent session conflicts
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(
      payload,
      process.env.VIDEOSDK_SECRET!,
      { 
        expiresIn: "24h",
        algorithm: "HS256"
      }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}