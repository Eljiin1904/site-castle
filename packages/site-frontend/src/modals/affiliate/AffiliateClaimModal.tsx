import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Affiliates } from "#app/services/affiliates";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLoading } from "@client/comps/modal/ModalLoading";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgCancel } from "@client/svgs/common/SvgCancel";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Trans, useTranslation } from "@core/services/internationalization/internationalization";
import { useQuery } from "@tanstack/react-query";

export const AffiliateClaimModal = () => {
  const query = useQuery({
    queryKey: ["claim"],
    queryFn: () => Affiliates.claimCommission(),
    placeholderData: (prev) => prev,
  });

  const amount = query.data?.amount;

  let bodyContent;

  if (query.isFetching) {
    bodyContent = <ModalLoading />;
  } else if (amount) {
    bodyContent = <ClaimedBody amount={amount} />;
  }
  else if (query.isError) {
    bodyContent = <ErrorBody error={query.error} />;
  }

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>{bodyContent}</ModalBody>
    </Modal>
  );
};

const ClaimedBody = ({ amount }: { amount: number }) => {

  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();
  
  return (<Div
      column
      gap={small? 20 : 24}
      flexCenter
      fx
    >
      <Div width={40} px={48} py={28} borderRadius={"full"} border borderColor="brown-4" borderWidth={1}>
        <Vector fx as={SvgCheckCircle} size={40} color="bright-green"/>
      </Div>
      <Div gap={4}>
        <Tokens
          value={amount}
          fontSize={small ? 20 : 24}
          family="title"
        />
        <Heading  as="h2"
          size={small ? 20 : 24}
          fontWeight="regular"
          textTransform="uppercase">
            {t('claimModal.header')}
        </Heading>
      </Div>
      <Paragraph textAlign="center">
        {//@ts-ignore
          <Trans
          i18nKey="referrals:claimModal.description"
          values={{amount: `${amount}` }}
          components={[
            <Tokens
              value={amount}
              color="dark-sand"
              fontSize={12}
            />,
          ]}
        />
        }
      </Paragraph>
    </Div>
  );
};

const ErrorBody = ({ error }: { error: Error }) => {
  
  const {t} = useTranslation(['validations']);
  const small = useIsMobileLayout();
  
  return (<Div
      column
      gap={small? 20 : 24}
      flexCenter
      fx
    >
      <Div width={40} px={48} py={28} borderRadius={"full"} border borderColor="brown-4" borderWidth={1}>
        <Vector fx as={SvgCancel} size={40} color="double-red"/>
      </Div>
      <Heading  as="h2"
        size={small ? 20 : 24}
        fontWeight="regular"
        textTransform="uppercase">{t(error.message)}
      </Heading>
    </Div>
  );
};