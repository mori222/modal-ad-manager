"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center w-full">
      <Image src="/logo.svg" alt="Modal-Ad" width={150} height={40} />
    </header>
  );
}
