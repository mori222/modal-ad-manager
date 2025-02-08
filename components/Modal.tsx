"use client";

import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ title, children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
