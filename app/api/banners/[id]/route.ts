import { prisma } from "@/lib/db"
import { Prisma } from "@prisma/client"

export const dynamic = "force-dynamic"

// GET: 特定のバナーを取得
export async function GET(req: Request) {
  try {
    // URL から ID を取得
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // `id` の取得
    const bannerId = Number(id);

    if (!id || isNaN(bannerId)) {
      return new Response(JSON.stringify({ error: "無効なバナーIDです。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const banner = await prisma.banner.findUnique({
      where: { id: bannerId },
    });

    if (!banner) {
      return new Response(JSON.stringify({ error: "バナーが見つかりません。" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(banner), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: "バナーの取得に失敗しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE: バナーを削除
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const bannerId = Number(id);

    if (!id || isNaN(bannerId)) {
      return new Response(JSON.stringify({ error: "無効なバナーIDです。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.banner.delete({
      where: { id: bannerId },
    });

    return new Response(JSON.stringify({ message: "バナーを削除しました。" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("DELETE Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response(JSON.stringify({ error: "バナーが見つかりません。" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "バナーの削除に失敗しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


// PUT: バナーを更新
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // URL から `id` を取得
    const bannerId = Number(id);
    const data = await req.json(); // リクエストボディのデータを取得

    if (!id || isNaN(bannerId)) {
      return new Response(JSON.stringify({ error: "無効なバナーIDです。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ error: "更新データが不足しています。" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedBanner = await prisma.banner.update({
      where: { id: bannerId },
      data,
    });

    return new Response(JSON.stringify(updatedBanner), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("PUT Error:", error);
    return new Response(JSON.stringify({ error: "バナーの更新に失敗しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

