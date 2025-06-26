import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useDispatch } from "react-redux";
import { Account } from "#app/services/account";

export const CustomRangeModal = () => {

  const minDate = useAppSelector((state) => state.account.userStatsMinDate);
  const maxDate = useAppSelector((state) => state.account.userStatsMaxDate);
  const {t} = useTranslation(["account"]);
  const dispatch = useDispatch();

  const handleSubmit = () => {

    dispatch(Account.setUserStatsDateRange("custom"));
    Dialogs.close("primary");
  }

  return (
    <Modal
      onBackdropClick={() => Dialogs.close("primary")}
      width="sm"
    >
      <ModalHeader
        heading={t("stats.dateranges.custom")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow="visible">
        <ModalSection>
          <ModalLabel>{"Start Date"}</ModalLabel>
          <Div fx  gap={16}>
          <Input
            type="date"
            selectsStart
            format="MM/dd/yyyy"
            placeholder="Enter end date..."
            onChange={(date) => dispatch(Account.setUserStatsMinDate(date))}
            value={minDate}
            startDate={minDate}
            endDate={maxDate}
          />
          <Input
            type="date"
            selectsEnd
            format="MM/dd/yyyy"
            placeholder="Enter end date..."
            onChange={(date) => dispatch(Account.setUserStatsMaxDate(date))}
            value={maxDate}
            startDate={minDate}
            endDate={maxDate}
            minDate={minDate}
          />
          </Div>
        </ModalSection>
        <ModalSection>
          <Button
            kind="primary-yellow"
            label={t("common:set")}
            fx
            onClick={handleSubmit}
          />
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
