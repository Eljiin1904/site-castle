import { Div } from "@client/comps/div/Div";
import { Main } from "@client/comps/main/Main";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AppErrorNotice = ({ error }: { error: string }) => {
  const { t } = useTranslation();
  return (
    <Main
      className="AppErrorNotice"
      column
      center
      fx
      fy
      p={16}
      bg="brown-7"
    >
      <PageNotice
        image="/graphics/login-banner"
        title={t("404.title")}
        message={t("404.message")}
        description={error}
        buttonLabel={t("404.reload")}
        onButtonClick={() => window.location.reload()}
      />
    </Main>
  );
};