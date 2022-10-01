import { createRef, FC, useEffect, useState } from "react";
import { store } from "../utils/documentTitle";

export const DocumentTitle: FC = () => {
  const [title, setTitle] = useState("React App");
  const titleRef = createRef<HTMLSpanElement>();
  const { subscribe } = store;
  // subscribe to title change

  useEffect(() => {
    const oldTitle = document.title;

    const subscription = subscribe(({ title }) => {
      document.title = title;

      // programmatically focus on span so that SR announces it
      if (titleRef.current) titleRef.current.focus();
      setTitle(title);
    });

    return () => {
      subscription();
      document.title = oldTitle;
    };
  }, []);

  return (
    <span tabIndex={-1} ref={titleRef} className="sr-only">
      {title}
    </span>
  );
};
