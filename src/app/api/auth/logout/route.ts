import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  // Clear the cookie natively from the server side
  response.cookies.set("lendsqr_session", "", {
    path: "/",
    maxAge: 0, // Instantly expires the session cookie
  });

  return response;
}
