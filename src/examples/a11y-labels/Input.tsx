import React from "react";
import { useA11y } from "./store";

export const Input: React.FC<{ name: string }> = ({ name }) => {
  const labelledBy = useA11y().useLabelledOrDescribedBy(name);
  return (
    <>
      <input
        className="bg-zinc-100 border border-zinc-200 m-2"
        type="text"
        aria-labelledby={labelledBy}
      />
      <div>
        <span className="text-zinc-500">Label id:</span>{" "}
        {labelledBy || "undefined"}
      </div>
    </>
  );
};
