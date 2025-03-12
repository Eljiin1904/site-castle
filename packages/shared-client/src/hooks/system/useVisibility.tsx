import { useState, useRef } from "react";
import { useEventListener } from "usehooks-ts";

export function useVisiblity() {
  const [hidden, setHidden] = useState(false);
  const documentRef = useRef<Document>(document);

  const onVisibilityChange = () => {
    setHidden(document.hidden);
  };

  useEventListener("visibilitychange", onVisibilityChange, documentRef);

  return !hidden;
}
