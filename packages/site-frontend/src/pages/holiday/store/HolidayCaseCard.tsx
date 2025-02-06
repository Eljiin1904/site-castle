import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { Intimal } from "@core/services/intimal";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteHoliday } from "@client/svgs/site/SvgSiteHoliday";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SvgSnowflake } from "@client/svgs/common/SvgSnowflake";
import "./HolidayCaseCard.scss";

export const HolidayCaseCard = ({ chest }: { chest: HolidayChest }) => {
  return (
    <Link
      className="HolidayCaseCard"
      type="router"
      to={`/holiday/cases/${chest.slug}`}
      flexFlow="column"
      alignItems="center"
      p={16}
      border
      bg="brown-6"
      hover="up"
    >
      <Vector
        as={SvgSnowflake}
        position="absolute"
        size={64}
        right={24}
        top={20}
        style={{ opacity: 0.2 }}
      />
      <Div
        className="image-ctn"
        center
      >
        <Img
          type="png"
          path={`/chests/${chest.imageId}`}
          width="136px"
        />
      </Div>
      <Span
        textOverflow="ellipsis"
        color="light-gray"
        mt={12}
      >
        {chest.displayName}
      </Span>
      <Div
        align="center"
        mt={6}
      >
        <Tokens
          value={chest.openCost}
          color="gold"
          fontSize={13}
        />
        <Span
          family="title"
          weight="bold"
          size={13}
          color="gold"
          ml={2}
        >
          {` Value`}
        </Span>
      </Div>
      <Div
        gap={4}
        mt={10}
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
          {Intimal.toLocaleString(chest.holidayCost, 0)}
        </Span>
      </Div>
    </Link>
  );
};
