"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'ghost' | 'success';
}

export function Button({ children, variant = 'default', className, ...props }: ButtonProps) {
  const variantStyles = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    success: "bg-blue-500 text-white hover:bg-blue-600"
  };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${variantStyles[variant]} ${className || ''}`}
    >
      {children}
    </button>
  );
}
