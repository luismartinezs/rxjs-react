import React from "react";
import { FakeModal } from "./FakeModal";

export const Modals: React.FC<{}> = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  return (
    <div className="flex">
      <div>
        <button onClick={() => setOpen1(!open1)}>Toggle 1</button>
        <FakeModal active={open1} />
      </div>
      <div>
        <button onClick={() => setOpen2(!open2)}>Toggle 2</button>
        <FakeModal active={open2} />
      </div>
      <div>
        <button onClick={() => setOpen3(!open3)}>Toggle 3</button>
        <FakeModal active={open3} />
      </div>
    </div>
  );
};
