import React, { createRef, useEffect } from "react";
import { useStore } from "./store";

const Subscriber = () => {
  const valueRef = createRef<HTMLParagraphElement>();

  useStore().useAdd(0, "Root");
  const value = useStore().useSubscribe() || "Root";

  useEffect(() => {
    const oldTitle = document.title;
    document.title = value;
    return () => {
      document.title = oldTitle;
    };
  }, [value]);

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.focus();
    }
  }, [value, valueRef]);

  return (
    <span tabIndex={-1} ref={valueRef} className="sr-only">
      {value}
    </span>
  );
};

export default Subscriber;
