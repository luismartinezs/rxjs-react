import React from "react";
import { FakeModal } from "./FakeModal";

export const Modals: React.FC<{}> = React.memo(() => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  return (
    <div className="flex">
      <div>
        <button disabled={open1} onClick={() => setOpen1(true)}>
          Open 1
        </button>
        <FakeModal active={open1} onClose={() => setOpen1(false)} />
      </div>
      <div>
        <button disabled={open2} onClick={() => setOpen2(true)}>
          Open 2
        </button>
        <FakeModal active={open2} onClose={() => setOpen2(false)} />
      </div>
      <div>
        <button disabled={open3} onClick={() => setOpen3(true)}>
          Open 3
        </button>
        <FakeModal active={open3} onClose={() => setOpen3(false)} />
      </div>
    </div>
  );
});
