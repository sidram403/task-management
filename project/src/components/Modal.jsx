import React from "react";

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl flex flex-col max-h-[90vh]">
        <div className=" overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
