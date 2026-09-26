import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/articles?id=eq.${id}&select=*&limit=1`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ article: data[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const body = await request.json();

    const updatePayload: any = {};
    if (body.title !== undefined) updatePayload.title = body.title;
    if (body.info !== undefined) updatePayload.info = body.info;
    if (body.category !== undefined) updatePayload.category = body.category;
    if (body.poster !== undefined) updatePayload.poster = body.poster;
    if (body.reading_time !== undefined) updatePayload.reading_time = body.reading_time;
    if (body.sub_category !== undefined) updatePayload.sub_category = body.sub_category;
    if (body.region !== undefined) updatePayload.region = body.region;
    if (body.content !== undefined) updatePayload.content = body.content;
    if (body.slug !== undefined) updatePayload.slug = body.slug;
    if (body.status !== undefined) updatePayload.status = body.status;

    const res = await fetch(`${supabaseUrl}/rest/v1/articles?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(updatePayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const updated = await res.json();

    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath(`/articles/${id}`);
    revalidateTag("articles");
    revalidateTag(`article-${id}`);

    return NextResponse.json({ success: true, article: updated[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/articles?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    revalidatePath("/");
    revalidatePath("/articles");
    revalidateTag("articles");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
