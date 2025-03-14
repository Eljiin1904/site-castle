import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { Card } from "@client/comps/cards/Card";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

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
  const layout = useAppSelector((x) => x.style.mainLayout);
  const collapse = layout === "mobile";

  return (
    <Card
      justify={collapse ? "space-between" : undefined}
      align="center"
      gap={12}
      px={16}
      py={12}
    >
      {!collapse && (
        <Heading
          as="h2"
          fx
        >
          {"Referrals"}
        </Heading>
      )}
      <Dropdown
        type="select"
        icon={SvgFilter}
        width={collapse ? "full" : undefined}
        options={["24 Hours", "7 days", "30 Days", "All-time"]}
        value={timeIndex}
        collapse={collapse}
        onChange={(x, i) => setTimeIndex(i)}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        width={collapse ? "full" : undefined}
        options={[
          "Commission",
          "Deposited",
          "Wagered",
          "Last Deposit",
          "Acquired",
        ]}
        value={sortIndex}
        collapse={collapse}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        kind="primary-yellow"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </Card>
  );
};
