import Link from "next/link";

const banners = [
  { id: 1, title: "バナー A" },
  { id: 2, title: "バナー B" },
  { id: 3, title: "バナー C" },
];

export default function BannerList() {
  return (
    <div className="p-12">
      <h1 className="text-2xl font-semibold mb-4">バナー一覧</h1>
      
      <div className="border rounded-lg p-4 bg-white shadow-md">
        {banners.map((banner) => (
          <div key={banner.id} className="flex justify-between items-center border-b py-2">
            <p>{banner.title}</p>
            <Link href={`/dashboard/banners/${banner.id}/edit`} className="text-blue-500 hover:underline">
              編集
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}