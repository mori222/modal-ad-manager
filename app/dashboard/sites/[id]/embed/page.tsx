"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EmbedCode = () => {
  const { id } = useParams();
  const router = useRouter();
  const [embedCode, setEmbedCode] = useState("");

  useEffect(() => {
    if (id) {
      setEmbedCode(`<script src="https://your-service.com/embed.js?siteId=${id}" async></script>`);
    }
  }, [id]);

  return (
    <div>
      <h1 className="text-xl font-bold">埋め込みタグ</h1>
      <p className="mt-2 text-gray-700">
        以下のスクリプトをサイトの <code>&lt;head&gt;</code> または <code>&lt;body&gt;</code> に追加してください。
      </p>
      <div className="mt-4 p-3 bg-gray-100 border rounded">
        <code className="text-sm">{embedCode}</code>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigator.clipboard.writeText(embedCode)}
      >
        コピー
      </button>
      <button
        className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => router.push("/dashboard/sites")}
      >
        サイト一覧へ
      </button>
    </div>
  );
};

export default EmbedCode;
