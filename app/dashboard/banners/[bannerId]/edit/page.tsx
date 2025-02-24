"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateBanner, deleteBanner } from "@/lib/banner"; // getBannerById を削除
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import Image from "next/image";

export default function EditBannerPage() {
  const router = useRouter();
  const { bannerId } = useParams();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayTiming, setDisplayTiming] = useState("5");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchBanner() {
      if (typeof bannerId !== "string") return;
      
      try {
        const res = await fetch(`/api/banners/${bannerId}`);
        if (!res.ok) {
          throw new Error("バナーが見つかりません");
        }
        const data = await res.json();

        setTitle(data.name);
        setImageUrl(data.imageUrl);
        setDisplayTiming(data.displayTiming);
        setRedirectUrl(data.url);
        setPreview(data.imageUrl);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    }

    if (bannerId) fetchBanner();
  }, [bannerId]);

  const handleSave = async () => {
    if (typeof bannerId !== "string") return;
    
    try {
      await updateBanner(bannerId, { 
        name: title, 
        imageUrl, 
        displayTiming, 
        url: redirectUrl 
      });
  
      router.push("/dashboard/banners");
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  const handleDelete = async () => {
    if (typeof bannerId !== "string") return;
    setIsDeleting(true);
  
    try {
      await deleteBanner(bannerId);
      router.push("/dashboard/banners");
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-12 mx-auto">
      <h1 className="text-xl font-semibold mb-4">バナー編集</h1>
      <div className="space-y-4">
        <Input label="バナー名" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="クリック遷移URL" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
        <Input label="表示タイミング（秒）" type="number" value={displayTiming} onChange={(e) => setDisplayTiming(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-2">バナー画像</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <Image src={preview} alt="バナー画像" width={400} height={200} className="mt-4 w-full max-h-40 object-cover" />}
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={handleSave} className="bg-blue-500 text-white">保存</Button>
          <Button onClick={() => setIsDeleting(true)} className="bg-red-500 text-white">削除</Button>
        </div>
      </div>
      {isDeleting && (
        <Modal isOpen={true} onClose={() => setIsDeleting(false)}>
          <p>本当にこのバナーを削除しますか？</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={handleDelete} className="bg-red-500 text-white">削除</Button>
            <Button onClick={() => setIsDeleting(false)}>キャンセル</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
