"use client";

import { useState } from "react";
import { Table } from "@/components/Table";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/Button";

interface ReportData {
  id: number;
  name: string;
  impressions: number;
  clicks: number;
  clickRate: string;
}

const sampleData: ReportData[] = [
  { id: 1, name: "サンプルバナーA", impressions: 120, clicks: 0, clickRate: "0%" },
  { id: 2, name: "サンプルバナーB", impressions: 120, clicks: 0, clickRate: "0%" },
  { id: 3, name: "サンプルバナーC", impressions: 120, clicks: 0, clickRate: "0%" },
  { id: 4, name: "サンプルバナーD", impressions: 120, clicks: 0, clickRate: "0%" },
];

export default function ReportTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const paginatedData = sampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Table>
        <thead>
          <tr>
            <th>フォーム名</th>
            <th>インプレッション</th>
            <th>クリック</th>
            <th>クリック率</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.impressions}</td>
              <td>{item.clicks}</td>
              <td>{item.clickRate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        <Button variant="success">ダウンロード</Button>
      </div>
    </div>
  );
}
