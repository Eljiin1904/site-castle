import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const HashManager = () => {
  const { hash } = useLocation();

  useEffect(() => {
    const id = `home-${hash.replace("#", "")}`;
    const element = document.getElementById(id);
    element?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [hash]);

  return null;
};
