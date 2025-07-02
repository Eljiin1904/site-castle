import { useNavigate } from "react-router-dom";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";
import { Img } from "@client/comps/img/Img";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const small = useIsMobileLayout();
  const {t} = useTranslation(["notices/notfound"]);
  return (
    <SitePage
      className="NotFoundPage"
      title="404"
    >
      <PageNotice
        image="/graphics/notice-castle-404"
        title={t("title")}
        buttonLabel={t("buttonLabel")}
        small={small}
        onButtonClick={() => navigate("/")}
      >
        <Fragment>
          <Img  type="png" path='/graphics/404/diamond' style={{top:"-10px", left:"-65px"}} width={"120px"} position="absolute"/>
          <Img  type="png" path='/graphics/404/coins' style={{bottom:"-50px", right:"-40px"}} width={"140px"} position="absolute"/>
        </Fragment>
      </PageNotice>
    </SitePage>
  );
};
