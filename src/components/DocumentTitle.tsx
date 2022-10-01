import { createRef, FC, useEffect } from "react";

export const DocumentTitle: FC<{ title: string }> = ({ title }) => {
  const titleRef = createRef<HTMLSpanElement>();

  useEffect(() => {
    const oldTitle = document.title;

    document.title = title;

    if (titleRef.current) {
      titleRef.current.focus();
    }

    return () => {
      document.title = oldTitle;
    };
  }, []);

  return (
    <span tabIndex={-1} ref={titleRef} className="sr-only">
      {title}
    </span>
  );
};
