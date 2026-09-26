import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/articles";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || undefined;

  try {
    const results = await searchArticles(q, cat);
    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, results: [] }, { status: 500 });
  }
}
