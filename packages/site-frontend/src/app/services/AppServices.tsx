import { useAppStyle } from "@client/app/services/useAppStyle";
import { useAppMilestones } from "./useAppMilestones";
import { useAppNotifications } from "./useAppNotifications";
import { useAppSite } from "./useAppSite";
import { useAppUser } from "./useAppUser";
import { useConsoleWarning } from "./useConsoleWarning";
import { useAppParticles } from "./useAppParticles";
import { useAppTracking } from "./useAppTracking";
import { useAppSocket } from "./useAppSocket";
import { useAppSession } from "./useAppSession";
import { useAppSupport } from "./useAppSupport";

export const AppServices = () => {
  useAppStyle();

  useAppSite();
  useAppUser();

  useAppSupport();

  useAppSession();
  useAppSocket();
  useAppMilestones();
  useAppTracking();

  useConsoleWarning();

  useAppParticles();
  useAppNotifications();

  return null;
};
