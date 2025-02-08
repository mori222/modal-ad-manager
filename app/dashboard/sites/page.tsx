"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";

interface Site {
  id: number;
  name: string;
  url: string;
}

export default function SiteListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [newSite, setNewSite] = useState({ name: "", url: "" });
  const [editSite, setEditSite] = useState<Site | null>(null);
  const [deleteSiteId, setDeleteSiteId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchSites() {
      try {
        const res = await fetch("/api/sites");
        if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
        const data = await res.json();
        setSites(data);
      } catch (err) {
        console.error("サイト一覧の取得に失敗:", err);
        setError("サイト一覧の取得に失敗しました");
      }
    }
    fetchSites();
  }, []);

  // 新規サイト登録
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newSite.name || !newSite.url) {
      setError("サイト名とURLは必須です");
      return;
    }

    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSite),
      });

      if (!res.ok) throw new Error("サイト登録に失敗");

      const createdSite = await res.json();
      setSites((prev) => [...prev, createdSite]);
      setNewSite({ name: "", url: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError("サイトの登録に失敗しました");
    }
  };

  // サイト編集
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSite) return;

    try {
      const res = await fetch(`/api/sites/${editSite.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editSite),
      });

      if (!res.ok) throw new Error("サイト編集に失敗");

      setSites((prev) =>
        prev.map((site) => (site.id === editSite.id ? editSite : site))
      );
      setEditModalOpen(false);
    } catch (err) {
      setError("サイトの編集に失敗しました");
    }
  };

  // サイト削除
  const handleDelete = async () => {
    if (!deleteSiteId) return;

    try {
      const res = await fetch(`/api/sites/${deleteSiteId}`, { method: "DELETE" });

      if (!res.ok) throw new Error("サイト削除に失敗");

      setSites((prev) => prev.filter((site) => site.id !== deleteSiteId));
      setDeleteModalOpen(false);
    } catch (err) {
      setError("サイトの削除に失敗しました");
    }
  };

  return (
    <div className="p-12 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">サイト一覧</h1>
        <Button onClick={() => setIsModalOpen(true)} className="text-bold">新規サイト追加</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Table>
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="py-2 px-6 w-1/3 text-left">サイト名</th>
            <th className="py-2 px-6 w-1/3 text-left">URL</th>
            <th className="py-2 px-6 w-1/3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td className="py-4 px-6 w-1/3">{site.name}</td>
              <td className="py-4 px-6 w-1/3">{site.url}</td>
              <td className="py-4 px-6 w-1/3 text-right">
                <Button onClick={() => { setEditSite(site); setEditModalOpen(true); }}>
                  編集
                </Button>
                <Button onClick={() => { setDeleteSiteId(site.id); setDeleteModalOpen(true); }} className="ml-2 bg-red-500">
                  削除
                </Button>
                <Button onClick={() => router.push(`/dashboard/sites/${site.id}/embed`)} className="ml-2 bg-gray-500">
                  タグ確認
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 新規サイト登録モーダル */}
      <Modal title="新規サイト登録" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="サイト名"
            value={newSite.name}
            onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
          />
          <Input
            type="url"
            label="サイトURL"
            value={newSite.url}
            onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
          />
          <div className="flex justify-end">
            <Button type="submit">登録</Button>
          </div>
        </form>
      </Modal>

      {/* サイト編集モーダル */}
      <Modal title="サイト編集" isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleEdit}>
          <Input
            type="text"
            label="サイト名"
            value={editSite?.name || ""}
            onChange={(e) => setEditSite((prev) => prev ? { ...prev, name: e.target.value } : null)}
          />
          <Input
            type="url"
            label="サイトURL"
            value={editSite?.url || ""}
            onChange={(e) => setEditSite((prev) => prev ? { ...prev, url: e.target.value } : null)}
          />
          <div className="flex justify-end">
            <Button type="submit">保存</Button>
          </div>
        </form>
      </Modal>

      {/* サイト削除確認モーダル */}
      <Modal title="サイト削除" isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <p>このサイトを削除してもよろしいですか？</p>
        <div className="flex justify-end mt-4">
          <Button onClick={handleDelete} className="bg-red-500">削除</Button>
        </div>
      </Modal>
    </div>
  );
}
