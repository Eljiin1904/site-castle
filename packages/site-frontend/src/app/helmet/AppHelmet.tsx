import { Helmet } from "react-helmet-async";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";

export const AppHelmet = () => {
  const { siteName } = config;

  const title = useAppSelector((x) => x.site.title);

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <script
        type="text/javascript"
        src="https://051d3aad-297f-494d-a94c-b3f489eac058.snippet.anjouangaming.org/anj-seal.js"
      />
    </Helmet>
  );
};
