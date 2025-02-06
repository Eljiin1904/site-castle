import { Intimal } from "@core/services/intimal";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { Div } from "@client/comps/div/Div";
import { SvgSiteHoliday } from "@client/svgs/site/SvgSiteHoliday";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const StoreHeader = () => {
  const holidayBalance = useAppSelector((x) => x.user.holidayBalance || 0);

  return (
    <Div height={40}>
      <PageTitle
        heading="Holiday Cases"
        icon={SvgChest}
      />
      <Div
        px={12}
        py={10}
        gap={6}
        center
        bg="brown-8"
        border
        borderColor="light-blue"
      >
        <Vector
          as={SvgSiteHoliday}
          size={14}
        />
        <Span
          family="title"
          weight="bold"
          color="white"
        >
          {Intimal.toLocaleString(holidayBalance, 0)}
        </Span>
        <Vector
          as={SvgInfoCircle}
          hover="highlight"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Every 100 XP earned = 1 Snowball"
        />
      </Div>
    </Div>
  );
};
