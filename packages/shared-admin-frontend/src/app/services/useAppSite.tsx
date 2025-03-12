import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";

export function useAppSite() {
  const dispatch = useAppDispatch();

  useSocketListener("site-settings-init", (obj) => {
    dispatch(Site.initSettings(obj));
  });

  useSocketListener("site-settings-update", (key, value) => {
    dispatch(Site.updateSetting({ key, value }));
  });

  useSocketListener("site-meta-init", (obj) => {
    dispatch(Site.initMeta(obj));
  });

  useSocketListener("site-meta-update", (key, value) => {
    dispatch(Site.updateMeta({ key, value }));
  });

  return null;
}
