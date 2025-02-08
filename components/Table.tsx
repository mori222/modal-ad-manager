"use client";

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <table className="w-full bg-white shadow-md rounded-lg">
      {children}
    </table>
  );
}
