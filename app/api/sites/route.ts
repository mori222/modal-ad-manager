import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const sites = await prisma.site.findMany();
    return NextResponse.json(sites);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newSite = await prisma.site.create({ data });

    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
  }
}
