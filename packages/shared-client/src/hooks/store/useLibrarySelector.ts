import type { StoreState } from "#client/store";
import { useSelector } from "react-redux";

export const useLibrarySelector = useSelector.withTypes<StoreState>();
