import { useQuery } from "@tanstack/react-query";
import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Rewards } from "#app/services/rewards";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const AdventInfoModal = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["advent-info"],
    queryFn: () => Rewards.getAdventInfo(),
    placeholderData: (prev) => prev,
  });

  const info = query.data?.info;
  const depositAmount = info?.depositAmount || 0;
  const wagerAmount = info?.wagerAmount || 0;

  let bonusRate = 0;

  const discordActive = info?.discordLinked;
  const previousActive = info?.previousDay;
  const depositActive = depositAmount >= Intimal.fromDecimal(20);
  const wagerActive = wagerAmount >= Intimal.fromDecimal(5000);

  if (discordActive) bonusRate += 0.5;
  if (previousActive) bonusRate += 0.5;
  if (depositActive) bonusRate += 0.5;
  if (wagerActive) bonusRate += 0.5;

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Advent Calendar"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Paragraph>
          {
            "Advent Calendar rewards are based on your last 24 hours of gameplay. Wager more to boost your rewards and increase your chances of winning an "
          }
          <Span color="gold">{"M4A4 Howl"}</Span>
          {"!"}
        </Paragraph>
        <Paragraph>
          {
            "Increase your Advent Calendar rewards by 50% for each of the following, up to 200%:"
          }
        </Paragraph>
        <Div
          fx
          column
          gap={12}
        >
          <BonusCard
            text="Link your Discord."
            active={discordActive}
          />
          <BonusCard
            text="Claim the previous day's Advent Calendar."
            active={previousActive}
          />
          <BonusCard
            text={`Deposit ${Intimal.toLocaleString(depositAmount, 0)}/20 tokens in the last 24 hours.`}
            active={depositActive}
          />
          <BonusCard
            text={`Wager ${Intimal.toLocaleString(wagerAmount, 0)}/5,000 tokens in the last 24 hours.`}
            active={wagerActive}
          />
        </Div>
        <Div fx>
          <Span
            weight="medium"
            color="light-blue"
          >
            {`Current Boost: ${Math.round(bonusRate * 100)} / 200%`}
          </Span>
        </Div>
      </ModalBody>
    </Modal>
  );
};

const BonusCard = ({
  text,
  active,
}: {
  text: string;
  active: boolean | undefined;
}) => {
  return (
    <Div gap={8}>
      <Vector
        as={SvgCheckCircle}
        color={active ? "green" : "dark-gray"}
      />
      <Span
        weight="medium"
        color={active ? "green" : "dark-gray"}
      >
        {text}
      </Span>
    </Div>
  );
};
