import { useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Vector } from "@client/comps/vector/Vector";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { SvgLock } from "@client/svgs/common/SvgLock";
import { ModalField } from "@client/comps/modal/ModalField";
import { Span } from "@client/comps/span/Span";
import { SvgEdit } from "@client/svgs/common/SvgEdit";
import { SvgCheck } from "@client/svgs/common/SvgCheck";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Button } from "@client/comps/button/Button";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Affiliates } from "#app/services/affiliates";

export const WalletReferral = () => {
  const [editing, setEditing] = useState(false);
  const [newCode, setNewCode] = useState<string>();
  const referral = useAppSelector((x) => x.user.referral);
  const pendingCode = useAppSelector((x) => x.user.meta.pendingReferralCode);
  const lockDays = Affiliates.referralLockDays;

  const handleSetCode = usePost(async () => {
    const confirmed = await waitForConfirmation({
      heading: newCode ? "Change Referral Code" : "Remove Referral Code",
      message: newCode
        ? `Are you sure you want to change your referral code to ${newCode}?`
        : "Are you sure you want to remove your pending referral code?",
    });

    if (!confirmed) {
      return;
    }

    await Affiliates.setPendingReferral({ referralCode: newCode });

    setNewCode(undefined);
    setEditing(false);

    Toasts.success("Updated pending referral code.");
  });

  let content;

  if (!editing && pendingCode) {
    content = (
      <Div fx>
        <ModalField
          height={40}
          gap={8}
          align="center"
          hover="border"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Referral code will be assigned once your deposit is completed."
        >
          <Vector
            as={SvgTeam}
            size={16}
          />
          <Span
            weight="semi-bold"
            color="white"
          >
            {pendingCode}
          </Span>
          <Div
            grow
            justify="flex-end"
            pr={32}
          >
            <Span
              size={12}
              color="light-blue"
            >
              {"Pending"}
            </Span>
          </Div>
        </ModalField>
        <FloatRight>
          <Button
            kind="secondary"
            size="xs"
            icon={SvgEdit}
            onClick={() => setEditing(true)}
          />
        </FloatRight>
      </Div>
    );
  } else if (
    referral &&
    differenceInDays(Date.now(), referral.timestamp) < lockDays
  ) {
    content = (
      <Div fx>
        <ModalField
          height={40}
          gap={8}
          align="center"
        >
          <Vector
            as={SvgTeam}
            size={16}
          />
          <Span
            color="white"
            weight="semi-bold"
          >
            {referral.name}
          </Span>
        </ModalField>
        <FloatRight>
          <Span
            size={12}
            color="light-green"
          >
            {"Active"}
          </Span>
          <Vector
            as={SvgLock}
            ml={4}
            mr={8}
            size={16}
            color="light-blue"
            hover="highlight"
            data-tooltip-id="app-tooltip"
            data-tooltip-content={`You can change your referral code once every ${lockDays} days. Unlocks ${Dates.toTimestamp(addDays(referral.timestamp, lockDays))}.`}
          />
        </FloatRight>
      </Div>
    );
  } else if (!editing && referral) {
    content = (
      <Div fx>
        <ModalField
          height={40}
          gap={8}
          align="center"
        >
          <Vector
            as={SvgTeam}
            size={16}
            hover="highlight"
            data-tooltip-id="app-tooltip"
            data-tooltip-content={`Referral code active since ${Dates.toTimestamp(referral.timestamp)}.`}
          />
          <Span
            color="white"
            weight="semi-bold"
          >
            {referral.name}
          </Span>
        </ModalField>
        <FloatRight>
          <Span
            size={12}
            color="light-green"
          >
            {"Active"}
          </Span>
          <Button
            kind="secondary"
            size="xs"
            icon={SvgEdit}
            onClick={() => setEditing(true)}
          />
        </FloatRight>
      </Div>
    );
  } else {
    content = (
      <Div fx>
        <Input
          type="text"
          placeholder="Enter referral code..."
          value={newCode}
          onChange={setNewCode}
          style={{ paddingLeft: "33px" }}
        />
        <Vector
          as={SvgInfoCircle}
          position="absolute"
          size={16}
          left={13}
          top={12}
          hover="highlight"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Set a referral code that will be assigned once your deposit is completed."
        />
        <FloatRight>
          <Button
            kind="secondary"
            size="xs"
            icon={SvgCheck}
            label="Apply"
            labelSize={13}
            disabled={!pendingCode && !referral && !newCode}
            onClick={handleSetCode}
          />
          {(pendingCode || referral) && (
            <Button
              kind="secondary"
              size="xs"
              icon={SvgTimes}
              onClick={() => {
                setNewCode(undefined);
                setEditing(false);
              }}
            />
          )}
        </FloatRight>
      </Div>
    );
  }

  return (
    <Div
      fx
      pb={16}
    >
      {content}
    </Div>
  );
};

const FloatRight = ({ children }: { children: any }) => {
  return (
    <Div
      position="absolute"
      align="center"
      justify="flex-end"
      right={4}
      top={0}
      bottom={0}
      gap={6}
    >
      {children}
    </Div>
  );
};
