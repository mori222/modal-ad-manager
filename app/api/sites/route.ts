import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, url } = body;

    // バリデーション
    if (!name || !url) {
      return NextResponse.json(
        { error: "name と url は必須です。" },
        { status: 400 }
      );
    }

    // サイトの作成
    const newSite = await prisma.site.create({
      data: {
        name,
        url,
      },
    });

    // newSite が正しく作成されているか確認
    if (!newSite) {
      throw new Error("サイトの作成に失敗しました。");
    }

    // 成功時にはオブジェクトを返す
    return NextResponse.json(newSite, { status: 201 });
  } catch (error: unknown) {
    console.error("POST Error:", error);

    // エラーハンドリング時にもオブジェクトを返す
    return NextResponse.json(
      { error: "サイトの作成に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sites = await prisma.site.findMany();
    return NextResponse.json(sites, { status: 200 });
  } catch (error: unknown) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "サイトの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
