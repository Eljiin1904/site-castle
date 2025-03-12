import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { CardSection } from "@client/comps/cards/CardSection";
import { SvgPlus } from "@client/svgs/common/SvgPlus";

export const KeysHeader = ({
  isLoading,
  onCreateClick,
  onRefreshClick,
}: {
  isLoading: boolean;
  onCreateClick: () => void;
  onRefreshClick: () => void;
}) => {
  return (
    <CardSection
      position="top"
      align="center"
      gap={12}
    >
      <Heading flexGrow>{"API Keys"}</Heading>
      <Button
        kind="primary"
        icon={SvgPlus}
        disabled={isLoading}
        onClick={onCreateClick}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
