import { PageTitle } from "@client/comps/page/PageTitle";
import { UserCard } from "./UserCard";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const ProfileBody = () => {
  const {t} = useTranslation(["account"]);
  const small = useIsMobileLayout();

  return (
    <Div fx column gap={40} pt={small? 24: 0}>
      <PageTitle
        heading={t('profile')}
      />
      <UserCard />
    </Div>
  );
};
