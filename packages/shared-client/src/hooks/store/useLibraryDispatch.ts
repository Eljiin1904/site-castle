import type { StoreState } from "#client/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useLibraryDispatch =
  useDispatch.withTypes<ThunkDispatch<StoreState, undefined, UnknownAction>>();
