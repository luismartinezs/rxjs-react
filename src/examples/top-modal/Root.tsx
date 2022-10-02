import { useState } from "react";
import Modal from "./Modal";

export default function Root() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Open new modal</button>
      <div className="relative">
        {count > 0 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
        {count > 1 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
        {count > 2 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
        {count > 3 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
        {count > 4 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
        {count > 5 && (
          <Modal onClose={() => setCount(count - 1)}>{count}</Modal>
        )}
      </div>
    </>
  );
}
