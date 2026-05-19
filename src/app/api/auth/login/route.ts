import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const errors: Record<string, string> = {};

    // Server-side validation rules
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Return structured validation payload if errors exist
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    // Simulate 1.2 seconds of network latency to trigger UI loading states
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set the cookie natively from the server side
    response.cookies.set("lendsqr_session", "true", {
      path: "/",
      maxAge: 86400, // 24 hours
      sameSite: "lax",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
