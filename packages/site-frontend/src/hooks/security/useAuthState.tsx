import { useLocalStorage } from "usehooks-ts";

export function useAuthRedirect() {
  return useLocalStorage("auth-return-to", "/");
}

export function useAuthSearch() {
  return useLocalStorage("auth-search", "");
}

export function useAuthStatus() {
  return useLocalStorage("auth-status", "");
}
