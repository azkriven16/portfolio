import { NextResponse } from "next/server";
import { getGuestbookCount } from "@/lib/db";

export async function GET() {
  try {
    const count = await getGuestbookCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
