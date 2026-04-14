import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Add database connection checks

  return NextResponse.json(
    {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
