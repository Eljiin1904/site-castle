import { ChestGameResult } from "@core/types/chests/ChestGameResult";
import { Dates } from "@core/services/dates";
import { Items } from "@core/services/items";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Span } from "@client/comps/span/Span";

export const FairnessCaseGameModal = ({
  result,
}: {
  result: ChestGameResult;
}) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
       heading={t('modal.title.case')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          fx
          gap={12}
        >
          {
            //@ts-ignore
            <Trans
              i18nKey="fairness:cases.info"
              values={{ unhashed: t("cases.unhashed"), hashed: t("cases.hashed") }}
              components={[
                <Span
                  color="light-sand"
                >
                  {t("cases.unhashed")}
                </Span>,
                <Span
                  color="sand"
                >
                  {t("cases.hashed")}
                </Span>,
              ]}
            />
          }
        </Div>
        <Div
          fx
          borderTop
        />
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.gameId')}</ModalLabel>
            <ModalField>{result.gameId}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.date')}</ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.case')}</ModalLabel>
            <ModalField>{result.chest.displayName}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.item')}</ModalLabel>
            <ModalField>{Items.getName(result.loot)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.roll')}</ModalLabel>
            <ModalField>{result.roll}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.won')}</ModalLabel>
            <ModalField>
              <Tokens value={result.loot.lootValue} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.clientSeed')}</ModalLabel>
            <ModalCopyField text={result.clientSeed} fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.nonce')}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField
            text={result.serverSeed || result.serverSeedHashed}
            color={result.serverSeed ? "light-sand" : "sand"}
            fontSize={12}
            lineHeight={16}
            textOverflow="ellipsis"
          />
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
