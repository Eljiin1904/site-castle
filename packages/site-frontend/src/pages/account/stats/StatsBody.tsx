import { Div } from "@client/comps/div/Div";
import { StatsHeader } from "./StatsHeader";
import { StatCardGrid } from "./StatCardGrid";
import { StatsWidgets } from "./StatsWidgets";
import { WageredChart } from "./WageredChart";
import { PnLChart } from "./PnLChart";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const StatsBody = () => {
  
  const chartOption = useAppSelector((state) => state.account.userStatsType);

  return (
    <Div
      fx
      column
      gap={40}
    >
      <StatsHeader/>
      <Div fx column gap={16}>
        {chartOption === 'wagered' && <WageredChart />}
        {chartOption === 'pnl' && <PnLChart />}
        <StatsWidgets />
      </Div>
      <Div fx column>       
        <StatCardGrid/>
      </Div>      
    </Div>
  );
};
