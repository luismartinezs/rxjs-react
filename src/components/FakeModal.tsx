import React, { useEffect } from "react";
import { useA11y } from "../utils/a11y";

export const FakeModal: React.FC<{ active?: boolean; onClose: () => void }> = ({
  active = false,
  onClose,
}) => {
  const { createComponentSpecificityId } = useA11y();
  const [isOnTop, setIsOnTop] = React.useState(false);

  const handleCloseModal = () => {
    if (!isOnTop) {
      return;
    }
    setIsOnTop(false);
    onClose();
  };

  useEffect(() => {
    if (!active) {
      return;
    }

    const { isComponentMostSpecific, destroy } = createComponentSpecificityId();

    const isMostSpecific = isComponentMostSpecific();

    if (!isMostSpecific) {
      return;
    }

    setIsOnTop(isMostSpecific);

    return () => {
      destroy();
    };
  }, [active, createComponentSpecificityId]);

  return (
    <div
      className={`w-32 h-32  m-4 flex items-center justify-center rounded-md ${
        active ? "border-2 border-blue-500 bg-blue-300" : "bg-blue-200"
      }`}
    >
      <div>
        <h1 className="text-lg">Modal {isOnTop && "top"}</h1>
        <button className="mt-2" onClick={() => handleCloseModal()}>
          Close
        </button>
      </div>
    </div>
  );
};
