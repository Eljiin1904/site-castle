import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const StatBanner = ({ onCloseClick }: { onCloseClick: () => void }) => {
  const totalRewards = useAppSelector((x) => x.user.stats.rewardAmount);
  const layout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Div>
      <Img
        type="jpg"
        path={`/graphics/rewards-banner_${layout}`}
        width="100%"
        height="160px"
        skeleton
      />
      <Div
        position="absolute"
        fx
        fy
        column
        align="flex-start"
        justify="center"
        p={24}
        gap={24}
      >
        <Vector
          as={SvgSiteLogo}
          className="site-logo"
          width={210 * 1.0}
          height={36 * 1.0}
        />
        <Div
          px={12}
          py={9}
          gap={4}
          align="center"
          bg="brown-8"
          border
          borderColor="yellow"
        >
          <Span
            size={14}
            color="white"
          >
            {"Total Rewards:"}
          </Span>
          <Tokens
            value={totalRewards || 0}
            fontSize={16}
          />
        </Div>
      </Div>
      <Vector
        as={SvgTimes}
        size={16}
        color="white"
        position="absolute"
        right={12}
        top={12}
        hover="highlight"
        onClick={onCloseClick}
      />
    </Div>
  );
};
