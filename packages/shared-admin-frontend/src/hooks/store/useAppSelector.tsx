import { useSelector } from "react-redux";
import type { store } from "../../store";

export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
