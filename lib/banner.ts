import { prisma } from '@/lib/db';

interface Banner {
  id: number;
  name: string;
  url: string;
  siteId: number;
  displayTiming: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getBannerById(id: string): Promise<Banner | null> {
  const banner = await prisma.banner.findUnique({
    where: { id: parseInt(id) }
  });
  if (!banner) return null;
  return banner;
}

export async function updateBanner(id: string, data: Partial<Banner>) {
  const res = await fetch(`/api/banners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("バナーの更新に失敗しました");
  }

  return await res.json();
}

export async function deleteBanner(id: string) {
  const res = await fetch(`/api/banners/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("バナーの削除に失敗しました");
  }

  return await res.json();
}
