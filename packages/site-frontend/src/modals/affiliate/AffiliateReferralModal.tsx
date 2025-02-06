import { AffiliateReportWithMeta } from "@core/types/affiliates/AffiliateReport";
import { Dates } from "@core/services/dates";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { Button } from "@client/comps/button/Button";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import { TipModal } from "../economy/TipModal";

export const AffiliateReferralModal = ({
  report,
}: {
  report: AffiliateReportWithMeta;
}) => {
  const level = Users.getLevel(report.user.xp);

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader onCloseClick={() => Dialogs.close("primary")} />
      <Div
        align="center"
        p={24}
        gap={16}
        borderBottom
      >
        <UserIcon
          avatarId={report.user.avatarId}
          avatarIndex={report.user.avatarIndex}
          width="80px"
        />
        <Div
          column
          gap={4}
        >
          <Span
            family="title"
            weight="bold"
            size={20}
            color="white"
          >
            {report.user.name}
          </Span>
          <Div
            align="center"
            mt={2}
          >
            <Img
              type="png"
              path={Users.getLevelBadge(level)}
              width="20px"
            />
            <Span
              size={12}
              weight="medium"
              color="gray"
              ml={6}
            >
              {`Level ${level}`}
            </Span>
          </Div>
          <Div mt={2}>
            {report.removeDate ? (
              <Span
                size={12}
                color="orange"
              >
                {`This user changed their referral on ${Dates.toWeekdayString(report.removeDate)}.`}
              </Span>
            ) : (
              <Span
                size={12}
                color="green"
              >
                {"This user is currently your referral."}
              </Span>
            )}
          </Div>
        </Div>
      </Div>
      <ModalBody>
        <ModalSection>
          <ModalLabel>{"Acquired"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(report.referDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Last Deposit"}</ModalLabel>
          <ModalField>
            {report.lastDepositDate
              ? Dates.toTimestamp(report.lastDepositDate)
              : "Never Deposited"}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Deposited"}</ModalLabel>
          <ModalField>
            <Tokens value={report.depositAmount} />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Wagered"}</ModalLabel>
          <ModalField>
            <Tokens value={report.wagerAmount} />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Commission"}</ModalLabel>
          <ModalField>
            <Tokens value={report.commissionAmount} />
          </ModalField>
        </ModalSection>
        <Button
          fx
          kind="primary"
          label="Tip User"
          onClick={() =>
            Dialogs.open("primary", <TipModal sendTo={report.user.name} />)
          }
        />
      </ModalBody>
    </Modal>
  );
};
