import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET: 特定のバナーを取得
export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const bannerId = Number(context.params.id);

    if (isNaN(bannerId)) {
      return new Response("Invalid banner ID", { status: 400 });
    }

    const banner = await prisma.banner.findUnique({
      where: { id: bannerId },
    });

    if (!banner) {
      return new Response("バナーが見つかりません", { status: 404 });
    }

    return Response.json(banner);
  } catch (error) {
    console.error("GET Error:", error);
    return new Response("サーバーエラー", { status: 500 });
  }
}

// DELETE: バナーを削除
export async function DELETE(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const bannerId = Number(context.params.id);

    if (isNaN(bannerId)) {
      return new Response("Invalid banner ID", { status: 400 });
    }

    await prisma.banner.delete({
      where: { id: bannerId },
    });

    return new Response("バナーを削除しました", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response("バナーが見つかりません", { status: 404 });
  }
}
