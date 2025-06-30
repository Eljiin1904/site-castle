import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Link } from "react-router-dom";

export const RaceHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const small = layout === "mobile" || layout === "tablet";
  const { t } = useTranslation(["pages/race"]);

  return (
    <Div
      justify={"space-between"}
      fx
      column={small}
      gap={24}
    >
      <PageTitle width={0}
        heading={t('leaders')}
      />
      <Div center gap={small ? 20: 24} flexShrink justifyContent="space-between">
        <Div gap={12}>
        {authenticated && (
            <Link
              type="router"
              to="/rewards/claim"
            >
              <Button
                kind="tertiary-grey"
                label={t('viewWins')}
              />
            </Link>
          )}
        </Div>        
      </Div>
    </Div>
  );
};