import { prisma } from "./db";

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  displayTiming: string;
  redirectUrl: string;
}

export async function getBannerById(id: string): Promise<Banner | null> {
  const banner = await prisma.banner.findUnique({
    where: { id: parseInt(id) }
  });
  if (!banner) return null;
  return banner;
}

export async function updateBanner(id: string, data: Partial<Banner>) {
  return await prisma.banner.update({
    where: { id: parseInt(id) },
    data
  });
}

export async function deleteBanner(id: string) {
  return await prisma.banner.delete({
    where: { id: parseInt(id) }
  });
} 