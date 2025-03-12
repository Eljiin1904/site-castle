import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { AppLoadingNotice } from "./AppLoadingNotice";
import { AppLoginNotice } from "./AppLoginNotice";

export const AppManager = ({ children }: { children: any }) => {
  const adminInitialized = useAppSelector((x) => x.admin.initialized);
  const adminAuthenticated = useAppSelector((x) => x.admin.authenticated);

  if (!adminInitialized) {
    return <AppLoadingNotice />;
  } else if (!adminAuthenticated) {
    return <AppLoginNotice />;
  }

  return children;
};
