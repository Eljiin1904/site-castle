import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUnmount } from "usehooks-ts";
import { Site } from "#app/services/site";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export const HashManager = () => {
  
  const dispatch = useAppDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    const id = `home-${hash.replace("#", "")}`;
    const element = document.getElementById(id);
    element?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [hash]);

  useUnmount(() => {
    dispatch(Site.setFilter('all'));
    dispatch(Site.setSearch(''));
  });  

  return null;
};
