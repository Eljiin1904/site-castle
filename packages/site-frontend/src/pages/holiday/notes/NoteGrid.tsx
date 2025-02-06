import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { SvgFast } from "@client/svgs/common/SvgFast";
import { SvgDiscord } from "@client/svgs/brands/SvgDiscord";
import { SvgTwitter } from "@client/svgs/brands/SvgTwitter";
import { SvgRain } from "@client/svgs/common/SvgRain";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { NoteCard } from "./NoteCard";

export const NoteGrid = () => {
  return (
    <Fragment>
      <PageTitle
        icon={SvgMedal}
        heading="More Rewards"
      />
      <Div
        gap={12}
        flow="row-wrap"
      >
        <NoteCard
          icon={SvgRain}
          heading="20% Rain Increase"
          description="More Rains"
        />
        <NoteCard
          icon={SvgFast}
          heading="20% Boost Increase"
          description="Daily, Weekly & Monthly"
        />
        <NoteCard
          icon={SvgFlag}
          heading="Increased Races"
          description="12.5K Weekly Race"
        />
        <NoteCard
          icon={SvgDiscord}
          heading="Discord Giveways"
          description="Daily Discord Giveways"
        />
        <NoteCard
          icon={SvgTwitter}
          heading="X/Twitter Giveways"
          description="31 Days of X Giveaways"
        />
      </Div>
    </Fragment>
  );
};
