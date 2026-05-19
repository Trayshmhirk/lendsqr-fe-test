import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch from your raw GitHub URL
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
      // Use Next.js caching to prevent hitting GitHub rate limits
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from source");
    }

    const data = await response.json();

    // Pass the structured payload exactly as you designed it
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
