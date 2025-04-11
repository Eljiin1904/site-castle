import { PageTitle } from "@client/comps/page/PageTitle";
import { UserCard } from "./UserCard";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ProfileBody = () => {
  const {t} = useTranslation(["account"]);
  
  return (
    <Div fx column gap={40}>
      <PageTitle
        heading={t('profile')}
      />
      <UserCard />
      {/* <StatCardGrid /> */}
    </Div>
  );
};
