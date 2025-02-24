"use client";

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function Dropdown({ options, value, onChange }: DropdownProps) {
  return (
    <select
      className="border border-gray-300 rounded-md px-4 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
