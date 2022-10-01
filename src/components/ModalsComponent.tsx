import React from "react";
import { Modal } from "./Modal";

// modals opening and closing trigger stack updates

export const ModalsComponent: React.FC<{}> = () => {
  const [show1, setShow1] = React.useState(true);
  const [show2, setShow2] = React.useState(false);
  return (
    <div>
      <h2 className="text-xl">Modals</h2>
      <div className="flex space-x-2 justify-center items-center">
        <button disabled={show1} onClick={() => setShow1(true)}>
          Open modal 1
        </button>
        <button disabled={show2} onClick={() => setShow2(true)}>
          Open modal 2
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div>{show1 && <Modal onClose={() => setShow1(false)}>1</Modal>}</div>
        <div>{show2 && <Modal onClose={() => setShow2(false)}>2</Modal>}</div>
      </div>
    </div>
  );
};
