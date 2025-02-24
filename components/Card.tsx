import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

interface RadioGroupProps {
  children: React.ReactElement<RadioProps> | React.ReactElement<RadioProps>[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioGroup({ children, name, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col space-y-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name, checked: child.props.value === value, onChange })
      )}
    </div>
  );
}

interface RadioProps {
  value: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function Radio({ value, name, checked, onChange, label }: RadioProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all ${
          checked ? "border-blue-500" : ""
        }`}
      >
        {checked && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
      </div>
      <span>{label}</span>
    </label>
  );
}
