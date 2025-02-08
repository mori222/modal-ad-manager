"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

export function DatePickerComponent({ startDate, endDate, onChange }: DateRangePickerProps) {
  return (
    <DatePicker
      selected={startDate}
      onChange={(update: [Date | null, Date | null]) => onChange(update)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      className="border border-gray-300 rounded-md px-4 py-2"
    />
  );
}
