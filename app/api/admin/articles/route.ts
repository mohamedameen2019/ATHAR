import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  let query = `${supabaseUrl}/rest/v1/articles?select=id,title,info,category,created_at,poster,views,reading_time,sub_category,region,slug,status&order=id.desc&limit=${limit}&offset=${offset}`;

  if (search) {
    const enc = encodeURIComponent(`%${search}%`);
    query += `&title=ilike.${enc}`;
  }
  if (category) {
    const encCat = encodeURIComponent(`%${category}%`);
    query += `&category=ilike.${encCat}`;
  }

  try {
    const res = await fetch(query, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "Range-Unit": "items",
        Prefer: "count=exact",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const contentRange = res.headers.get("content-range") || "";
    const totalCount = contentRange.includes("/") ? parseInt(contentRange.split("/")[1], 10) : data.length;

    return NextResponse.json({ data, total: totalCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  try {
    const body = await request.json();

    // Prepare insert payload matching Supabase articles table
    const insertPayload: any = {
      title: body.title,
      info: body.info || body.excerpt || "",
      category: body.category || "ملفات وثائقية",
      poster: body.poster || body.featuredImage || "",
      reading_time: body.reading_time || body.readingTimeMinutes || 8,
      sub_category: body.sub_category || (Array.isArray(body.tags) ? body.tags.join(", ") : ""),
      region: body.region || "الشرق الأوسط",
      content: body.content || [],
      views: 0,
      secret_key: "com.hayahdocs.technical2019",
    };

    if (body.slug) insertPayload.slug = body.slug;
    if (body.status) insertPayload.status = body.status;

    const res = await fetch(`${supabaseUrl}/rest/v1/articles`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(insertPayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const created = await res.json();

    // Revalidate cached paths
    revalidatePath("/");
    revalidatePath("/articles");
    revalidateTag("articles");

    return NextResponse.json({ success: true, article: created[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
