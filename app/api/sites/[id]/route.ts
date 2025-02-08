import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Prismaを使用する場合

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const siteId = Number(params.id);
  const data = await req.json();

  if (!siteId || !data.name || !data.url) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: { name: data.name, url: data.url },
    });

    return NextResponse.json(updatedSite, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const siteId = Number(params.id);
  
    if (!siteId) {
      return NextResponse.json({ error: "Invalid site ID" }, { status: 400 });
    }
  
    try {
      await prisma.site.delete({
        where: { id: siteId },
      });
  
      return NextResponse.json({ message: "Site deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }
  }