import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { Card } from "@client/comps/cards/Card";

export const ReferralsHeader = ({
  timeIndex,
  sortIndex,
  isLoading,
  setTimeIndex,
  setSortIndex,
  onRefreshClick,
}: {
  timeIndex: number;
  sortIndex: number;
  isLoading: boolean;
  setTimeIndex: (x: number) => void;
  setSortIndex: (x: number) => void;
  onRefreshClick: () => void;
}) => {
  return (
    <Card
      align="center"
      gap={12}
      px={16}
      py={12}
    >
      <Heading
        as="h2"
        fx
      >
        {"Referrals"}
      </Heading>
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={["24 Hours", "7 days", "30 Days", "All-time"]}
        value={timeIndex}
        onChange={(x, i) => setTimeIndex(i)}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={[
          "Deposited",
          "Wagered",
          "Commission",
          "Last Deposit",
          "Acquired",
        ]}
        value={sortIndex}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </Card>
  );
};
