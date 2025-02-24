import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { RouteContext } from "@/types/routeContext";

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const bannerId = Number(id);

  if (isNaN(bannerId)) {
    return NextResponse.json({ error: "Invalid banner ID" }, { status: 400 });
  }

  try {
    const banner = await prisma.banner.findUnique({
      where: { id: bannerId },
    });

    if (!banner) {
      return NextResponse.json({ error: "バナーが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}

// バナーを更新
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const bannerId = Number(id);
  const data = await req.json();

  if (isNaN(bannerId) || !data.name) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const updatedBanner = await prisma.banner.update({
      where: { id: bannerId },
      data,
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