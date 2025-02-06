import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Link } from "@client/comps/link/Link";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgLink } from "@client/svgs/common/SvgLink";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useShare } from "./useShare";

export const BattleHeader = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="BattleHeader"
      height={40}
    >
      <Conditional
        value={mainLayout}
        mobile={<MobileHeader />}
        tablet={<NotMobileHeader />}
        laptop={<NotMobileHeader />}
        desktop={<NotMobileHeader />}
      />
    </Div>
  );
};

const MobileHeader = () => {
  const mode = useAppSelector((x) => x.battlePlayer.mode);
  const modifiers = useAppSelector((x) => x.battlePlayer.modifiers);
  const entryCost = useAppSelector((x) => x.battlePlayer.entryCost);
  const category = CaseBattles.getModeCategory(mode);

  const handleShare = useShare();

  return (
    <Div fx>
      <Link
        type="router"
        to="/case-battles"
        flexCenter
        hover="none"
      >
        <Button
          kind="secondary"
          icon={SvgCaretLeft}
        />
      </Link>
      <Div
        fx
        column
        align="flex-start"
        justify="center"
        ml={12}
        gap={2}
      >
        <Span
          size={12}
          color="light-gray"
        >
          {category}
        </Span>
        <Div gap={8}>
          {modifiers.map((modifier) => (
            <Div
              key={modifier}
              center
              gap={4}
            >
              <Vector
                as={CaseBattles.getModifierIcon(modifier)}
                size={11}
                color={CaseBattles.getModifierColor(modifier)}
              />
              <Span
                family="title"
                weight="bold"
                size={10}
                color={CaseBattles.getModifierColor(modifier)}
              >
                {Strings.kebabToTitle(modifier).toUpperCase()}
              </Span>
            </Div>
          ))}
        </Div>
        <Tokens
          value={entryCost}
          fontSize={11}
        />
      </Div>
      <Div gap={8}>
        <VolumeDropdown prefix="case-battles" />
        <Dropdown
          type="menu"
          button={
            <Button
              kind="secondary"
              icon={SvgCog}
            />
          }
          options={[
            {
              type: "router",
              to: "/fairness/case-battles",
              label: "Fairness",
              iconLeft: SvgCheckCircle,
            },
            {
              type: "action",
              label: "Share",
              iconLeft: SvgLink,
              onClick: handleShare,
            },
          ]}
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.battlePlayer.mode);
  const modifiers = useAppSelector((x) => x.battlePlayer.modifiers);
  const entryCost = useAppSelector((x) => x.battlePlayer.entryCost);
  const category = CaseBattles.getModeCategory(mode);

  const handleShare = useShare();

  return (
    <Div fx>
      <Div
        fx
        align="center"
        gap={16}
      >
        <Link
          type="router"
          to="/case-battles"
          hover="none"
        >
          <Button
            kind="secondary"
            icon={SvgCaretLeft}
            label="Back"
          />
        </Link>
        <Div
          gap={mainLayout === "tablet" ? 3 : 8}
          align="flex-start"
          column={mainLayout === "tablet"}
        >
          <Span>{"Battle Cost"}</Span>
          <Tokens value={entryCost} />
        </Div>
      </Div>
      <Div
        fx
        center
        column
        gap={4}
      >
        <Heading>{category}</Heading>
        <Div
          gap={8}
          mt={2}
        >
          {modifiers.map((modifier) => (
            <Div
              key={modifier}
              center
              gap={4}
            >
              <Vector
                as={CaseBattles.getModifierIcon(modifier)}
                size={14}
                color={CaseBattles.getModifierColor(modifier)}
              />
              <Span
                family="title"
                weight="bold"
                size={11}
                color={CaseBattles.getModifierColor(modifier)}
              >
                {Strings.kebabToTitle(modifier).toUpperCase()}
              </Span>
            </Div>
          ))}
        </Div>
      </Div>
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        <Link
          type="router"
          to="/fairness/case-battles"
          hover="none"
        >
          <Button
            kind="secondary"
            icon={SvgCheckCircle}
            label={mainLayout === "tablet" ? undefined : "Fairness"}
          />
        </Link>
        <Button
          kind="secondary"
          icon={SvgLink}
          label={mainLayout === "tablet" ? undefined : "Share"}
          onClick={handleShare}
        />
        <VolumeDropdown prefix="case-battles" />
      </Div>
    </Div>
  );
};
