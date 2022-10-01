import React from "react";

export const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <div className="w-32 h-32 m-2 flex items-center justify-center rounded-md bg-blue-200">
      <div>
        <h1 className="text-lg">{children}</h1>
        <button className="mt-2" onClick={() => onClose()}>
          Close
        </button>
      </div>
    </div>
  );
};
