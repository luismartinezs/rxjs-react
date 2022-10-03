import React from "react";
import { useStore } from "./store";

const Subscriber = () => {
  useStore().useAdd(0, "Root");
  return <div>{useStore().useSubscribe() || "Root"}</div>;
};

export default Subscriber;
