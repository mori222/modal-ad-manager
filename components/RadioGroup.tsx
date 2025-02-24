import React from "react";

interface RadioProps {
  value: string;
  label: string;
}

interface RadioGroupProps {
  children: React.ReactElement<RadioProps>[];
  value: string;
  onValueChange: (value: string) => void;
}

export function RadioGroup({ children, value, onValueChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col space-y-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onValueChange(child.props.value)
        })
      )}
    </div>
  );
}

export function Radio({ value, label, checked, onChange }: RadioProps & { checked?: boolean; onChange?: () => void }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${checked ? "border-blue-500" : "border-gray-400"}`}>
        {checked && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
      </div>
      <span>{label}</span>
    </label>
  );
} 