"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewBannerPage() {
  const [bannerName, setBannerName] = useState<string>("");
  const [displayTiming, setDisplayTiming] = useState<string>("click_back");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]); // デバッグ用
    }
  };

  const handleSave = async () => {
    if (!bannerName || !file || !bannerUrl) {
      setError("バナー名とURL、画像ファイルは必須です。");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", bannerName);
      formData.append("displayTiming", displayTiming);
      formData.append("url", bannerUrl);
      formData.append("file", file);

      console.log("Sending request..."); // デバッグログ追加

      const response = await fetch("/api/banners", {
        method: "POST",
        body: formData,
      });

      console.log("Response received:", response.status); // デバッグログ追加

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "バナーの保存に失敗しました。");
      }

      const data = await response.json();
      console.log("Success response:", data); // デバッグログ追加

      setSuccess(true);
      router.push("/dashboard/banners");
    } catch (err) {
      console.error("Save error:", err); // デバッグログ追加
      setError(err instanceof Error ? err.message : "バナーの保存中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">バナー新規登録</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">バナーが正常に保存されました。</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          名称 <span className="text-red-500">必須</span>
        </label>
        <input
          type="text"
          value={bannerName}
          onChange={(e) => setBannerName(e.target.value)}
          placeholder="バナー名を入力"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          リンク先URL <span className="text-red-500">必須</span>
        </label>
        <input
          type="url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">表示タイミング</label>
        <select
          value={displayTiming}
          onChange={(e) => setDisplayTiming(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="click_back">戻るボタンをクリックしたとき</option>
          <option value="page_load">ページが表示されてからの秒数</option>
          <option value="scroll_position">一定のところまでスクロールされたとき</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          バナー画像 <span className="text-red-500">必須</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {isLoading ? "保存中..." : "保存"}
      </button>
    </div>
  );
}
