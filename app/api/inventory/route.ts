import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/inventory_dashboard?select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
 } catch (error) {
  console.error("Inventory API error:", error);

  return NextResponse.json(
    {
      error: "Failed to load inventory",
      details: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
  );
  }
  }
