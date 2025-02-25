import { useAppSelector } from "../store/useAppSelector";

export const useIsMobileLayout = () =>{
    
  const layout = useAppSelector(x => x.style.bodyLayout);
  return layout === "mobile";
};