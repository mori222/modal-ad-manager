import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { RouteContext } from "@/types/routeContext";

// バナーを更新
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const bannerId = Number(id);
  const data = await req.json();

  if (isNaN(bannerId) || !data.title) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const updatedBanner = await prisma.banner.update({
      where: { id: bannerId },
      data: { name: data.title },
    });

    return NextResponse.json(updatedBanner, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "バナーが見つかりません" }, { status: 404 });
  }
}

// バナーを削除
export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const bannerId = Number(id);

  if (isNaN(bannerId)) {
    return NextResponse.json({ error: "Invalid banner ID" }, { status: 400 });
  }

  try {
    await prisma.banner.delete({
      where: { id: bannerId },
    });

    return NextResponse.json({ message: "バナーを削除しました" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "バナーが見つかりません" }, { status: 404 });
  }
}
