import React, { useState } from "react";
import { Modal } from "./Modal";
import { Provider } from "./store";
import Subscriber from "./Subscriber";

export default function Root() {
  const [count, setCount] = useState(1);

  return (
    <Provider>
      <Subscriber />
      <button
        onClick={() =>
          setCount((count) => {
            if (count >= 5) {
              return count;
            }
            return count + 1;
          })
        }
      >
        Open new modal
      </button>
      <div className="text-sm">5 levels allowed</div>
      <div className="relative">
        {count > 0 && (
          <Modal onClose={() => setCount(count - 1)} value="Alice">
            {count}
          </Modal>
        )}
        {count > 1 && (
          <Modal onClose={() => setCount(count - 1)} value="Bob">
            {count}
          </Modal>
        )}
        {count > 2 && (
          <Modal
            onClose={() => setCount(count - 1)}
            value="Charlie"
            priority={2}
          >
            {count}
          </Modal>
        )}
        {count > 3 && (
          <Modal onClose={() => setCount(count - 1)} value="Dalton">
            {count}
          </Modal>
        )}
        {count > 4 && (
          <Modal
            onClose={() => setCount(count - 1)}
            value="Eustass"
            priority={3}
          >
            {count}
          </Modal>
        )}
        {count > 5 && (
          <Modal onClose={() => setCount(count - 1)} value="Felix" priority={3}>
            {count}
          </Modal>
        )}
      </div>
    </Provider>
  );
}
