import { NextResponse } from "next/server";
import { getCatalogs } from "@/lib/store";

export async function GET() {
  const catalogs = await getCatalogs();
  return NextResponse.json({ catalogs });
}
