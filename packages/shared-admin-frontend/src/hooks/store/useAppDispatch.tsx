import { useDispatch } from "react-redux";
import type { store } from "../../store";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
