"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

async function fetchSites(){
  const res = await fetch("/api/sites");
  return res.json();
}

async function fetchBanners(siteId: number) {
  const res = await fetch(`/api/banners?siteId=${siteId}`);
  return res.json();
}

async function deleteBanner(bannerId: number) {
  await fetch(`/api/banners/${bannerId}`, { method: "DELETE" });
}

export default function BannerList() {
  const [sites, setSites] = useState<{ id: number; name: string }[]>([]);
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const [banners, setBanners] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    fetchSites().then((data) => setSites(data));
  }, []);

  useEffect(() => {
    if (selectedSite) {
      fetchBanners(selectedSite).then((data) => setBanners(data));
    }
  }, [selectedSite]);

  const handleDelete = async (bannerId: number) => {
    await deleteBanner(bannerId);
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId));
  };

  return (
    <div className="p-12">
      <h1 className="text-2xl font-semibold mb-4">バナー管理</h1>

      {/* サイト選択プルダウン */}
      <select
        value={selectedSite || ""}
        onChange={(e) => setSelectedSite(Number(e.target.value))}
        className="mb-4 p-2 border rounded"
      >
        <option value="" disabled>サイトを選択</option>
        {sites.map((site) => (
          <option key={site.id} value={site.id}>{site.name}</option>
        ))}
      </select>

      {/* 新規作成ボタン */}
      <div className="mb-4 flex justify-end">
        <Link href="/dashboard/banners/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          新規作成
        </Link>
      </div>

      {/* バナーリスト */}
      <div className="border rounded-lg p-4 bg-white shadow-md">
        {banners.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">バナー名</th>
                <th className="p-2 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="border-b">
                  <td className="p-2">{banner.title}</td>
                  <td className="p-2 flex gap-2">
                    <Link href={`/dashboard/banners/${banner.id}/edit`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      編集
                    </Link>
                    <button 
                      onClick={() => handleDelete(banner.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">バナーがありません</p>
        )}
      </div>
    </div>
  );
}
