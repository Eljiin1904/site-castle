import { useAppStyle } from "@client/app/services/useAppStyle";
import { useAppAdmin } from "./useAppAdmin";
import { useAppSite } from "./useAppSite";

export function AppServices() {
  useAppStyle();

  useAppSite();
  useAppAdmin();

  return null;
}
