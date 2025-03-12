import { Helmet } from "react-helmet-async";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";

export const AppHelmet = () => {
  const title = useAppSelector((x) => x.site.title);
  return (
    <Helmet>
      <title>
        {title
          ? `${title} | ${config.siteName} Admin`
          : `${config.siteName} Admin`}
      </title>
    </Helmet>
  );
};
