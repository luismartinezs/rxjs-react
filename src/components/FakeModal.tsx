import React, { useEffect } from "react";
import { useA11y } from "../utils/a11y";

export const FakeModal: React.FC<{ active?: boolean }> = ({
  active = false,
}) => {
  const { createComponentSpecificityId } = useA11y();
  const [isOnTop, setIsOnTop] = React.useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const { isComponentMostSpecific, destroy } = createComponentSpecificityId();

    setIsOnTop(isComponentMostSpecific());

    return () => {
      destroy();
    };
  }, [active]);

  return (
    <div
      className={`w-32 h-32 bg-blue-200 m-4 flex items-center justify-center rounded-md ${
        active && "border-2 border-blue-500"
      }`}
    >
      <div>
        <h1 className="text-lg">Modal {isOnTop && "top"}</h1>
      </div>
    </div>
  );
};
