import { NextResponse } from "next/server";
import { getUsdToCopRate } from "@/lib/exchangeRate";

export async function GET() {
  const rate = await getUsdToCopRate();
  return NextResponse.json(
    { usdToCop: rate },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  );
}
