import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// PUT: サイトを更新
export async function PUT(req: NextRequest) {
  try {
    // URL から ID を取得
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const siteId = Number(id);
    const data = await req.json();

    if (!id || isNaN(siteId) || !data.name) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

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
export async function DELETE(req: NextRequest) {
  try {
    // URL から ID を取得
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const siteId = Number(id);

    if (!id || isNaN(siteId)) {
      return NextResponse.json({ error: "Invalid site ID" }, { status: 400 });
    }

    await prisma.site.delete({
      where: { id: siteId },
    });

    return NextResponse.json({ message: "サイトを削除しました" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "サイトが見つかりません" }, { status: 404 });
  }
}
