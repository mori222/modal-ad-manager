import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ✅ Next.js の動的ルート最適化を防ぐ
export const dynamic = "force-dynamic";

// PUT: サイト情報を更新
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("context:", params); // ✅ デバッグ用

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Invalid site ID" }, { status: 400 });
  }

  const siteId = Number(id);
  const data = await req.json();

  if (isNaN(siteId) || !data.name) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data,
    });

    return NextResponse.json(updatedSite, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "サイトが見つかりません" }, { status: 404 });
  }
}

// DELETE: サイトを削除
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("context:", params); // ✅ デバッグ用

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Invalid site ID" }, { status: 400 });
  }

  const siteId = Number(id);

  if (isNaN(siteId)) {
    return NextResponse.json({ error: "Invalid site ID" }, { status: 400 });
  }

  try {
    await prisma.site.delete({
      where: { id: siteId },
    });

    return NextResponse.json({ message: "サイトを削除しました" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "サイトが見つかりません" }, { status: 404 });
  }
}
