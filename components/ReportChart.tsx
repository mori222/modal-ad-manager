"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "9/1", impressions: 50, clicks: 20 },
  { date: "9/5", impressions: 60, clicks: 22 },
  { date: "9/10", impressions: 65, clicks: 21 },
  { date: "9/15", impressions: 70, clicks: 23 },
  { date: "9/20", impressions: 75, clicks: 24 },
  { date: "9/25", impressions: 80, clicks: 25 },
  { date: "9/30", impressions: 70, clicks: 22 },
];

export default function ReportChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="impressions" stroke="#38bdf8" name="インプレッション数" />
        <Line type="monotone" dataKey="clicks" stroke="#f87171" name="クリック数" />
      </LineChart>
    </ResponsiveContainer>
  );
}
