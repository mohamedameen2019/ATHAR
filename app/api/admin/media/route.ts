import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET_NAME = "articles-media";

async function ensureBucket() {
  if (!supabaseUrl || !supabaseKey) return;
  try {
    await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: BUCKET_NAME,
        name: BUCKET_NAME,
        public: true,
      }),
    });
  } catch {
    // Bucket might already exist
  }
}

export async function GET() {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  await ensureBucket();

  try {
    const res = await fetch(`${supabaseUrl}/storage/v1/object/list/${BUCKET_NAME}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ files: [] });
    }

    const files = await res.json();
    const mapped = (files || []).map((f: any) => ({
      name: f.name,
      id: f.id,
      size: f.metadata?.size || 0,
      createdAt: f.created_at,
      url: `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${f.name}`,
    }));

    return NextResponse.json({ files: mapped });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, files: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }

  await ensureBucket();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}-${cleanName}`;

    const buffer = await file.arrayBuffer();

    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/${BUCKET_NAME}/${uniqueFileName}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": file.type || "application/octet-stream",
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json({ error: `فشل رفع الملف: ${err}` }, { status: uploadRes.status });
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
