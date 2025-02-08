"use client";

import { useState } from "react";
import ReportChart from "@/components/ReportChart";
import ReportTable from "@/components/ReportTable";
import { Dropdown } from "@/components/Dropdown";
import { DatePickerComponent } from "@/components/DatePicker";
import { Button } from "@/components/Button";
import { Settings } from "lucide-react";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

export default function ReportsPage() {
  const [selectedSite, setSelectedSite] = useState("サンプルサイトA");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date("2023/09/01"),
    end: new Date("2023/09/30")
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">レポート</h1>
        <Dropdown value={selectedSite} onChange={setSelectedSite} options={[{ value: "サンプルサイトA", label: "サンプルサイトA" }, { value: "サンプルサイトB", label: "サンプルサイトB" }]} />
        <DatePickerComponent startDate={dateRange.start} endDate={dateRange.end} onChange={(dates: [Date | null, Date | null]) => setDateRange({ start: dates[0], end: dates[1] })} />
      </div>
      <ReportChart />
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-semibold">データ一覧</h2>
        <div className="flex items-center gap-2">
          <Button color="green">ダウンロード</Button>
          <Settings className="w-6 h-6 text-gray-600" />
        </div>
      </div>
      <ReportTable />
    </div>
  );
}
