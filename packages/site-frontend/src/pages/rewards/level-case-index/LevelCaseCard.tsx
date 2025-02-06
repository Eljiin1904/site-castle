import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Vector } from "@client/comps/vector/Vector";
import { SvgKey } from "@client/svgs/common/SvgKey";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Card } from "@client/comps/cards/Card";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Rewards } from "#app/services/rewards";
import "./LevelCaseCard.scss";

export const LevelCaseCardPlaceholder = () => {
  return <Placeholder className="LevelCaseCard" />;
};

export const LevelCaseCard = ({
  chest,
  keys,
}: {
  chest: ChestDocument;
  keys: number;
}) => {
  const info = Rewards.findLevelInfo((x) => x.chestId === chest._id);

  return (
    <Link
      className="LevelCaseCard"
      type="router"
      to={`/rewards/level-cases/${chest.slug}`}
      hover="none"
    >
      <Card
        column
        align="center"
        p={16}
        hover="up"
      >
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
          weight="semi-bold"
          textOverflow="ellipsis"
          mt={12}
        >
          {chest.displayName}
        </Span>
        <Span
          size={12}
          color="light-purple"
          mt={8}
        >
          {`Level ${info.start} - ${info.end}`}
        </Span>
        <Div
          gap={4}
          mt={12}
        >
          <Vector
            as={SvgKey}
            size={14}
            color="gold"
          />
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {keys}
          </Span>
        </Div>
      </Card>
    </Link>
  );
};
