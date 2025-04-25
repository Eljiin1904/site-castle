import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Toasts } from "@client/services/toasts";
import config from "#app/config";

/**
 * Display the default referral code and link for the user. Copy link to clipboard functionality is included.
 * @returns Default Referral Details component
 */
export const DefaultReferral = () => {

  const username = useAppSelector((x) => x.user.username);
  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${config.siteURL}/r/${username}`);
    Toasts.success(t('copiedToClipboard'));
  };

  return (<Div fx column gap={20}>
    <PageTitle  
      heading={t('inviteAFriend')}
      mt={small ? 0: 16}
    />
    <Div fx bg={`black-hover`} gap={small ? 16: 24} p={small ? 20: 24} column={small}>
      <ModalSection>
        <ModalLabel>{t('referralCode')}</ModalLabel>
        <ModalField>{username}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('referralLink')}</ModalLabel>
        <ModalField justifyContent="space-between" onClick={handleCopy}>{`${config.siteURL}/r/${username}`}<Vector as={SvgCopy} /></ModalField>
      </ModalSection>
    </Div>
  </Div>);
};