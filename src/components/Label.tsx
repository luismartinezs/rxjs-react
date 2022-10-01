import React from "react";
import { useA11y } from "../utils/a11y";

export const Label: React.FC<{ name: string; label: string }> = ({
  name,
  label,
}) => {
  const id = useA11y().useRegisteredId(name);
  return <span id={id}>{label}</span>;
};
