import React, { ReactNode, FC } from "react";
import { useStore } from "./store";

interface IProps {
  children: ReactNode;
  onClose: () => void;
  priority?: number;
  value: string;
}

export const Modal: FC<IProps> = ({
  onClose,
  children,
  priority = 1,
  value,
}) => {
  useStore().useAdd(priority, value);

  return (
    <div className="absolute w-32 h-32 bg-zinc-200 rounded-lg flex flex-col justify-between p-2">
      <div className="text-xl font-bold my-2">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
