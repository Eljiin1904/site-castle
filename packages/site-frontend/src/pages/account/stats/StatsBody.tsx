import { Div } from "@client/comps/div/Div";
import { StatsHeader } from "./StatsHeader";
import { StatCardGrid } from "./StatCardGrid";
import { StatsWidgets } from "./StatsWidgets";
import { WageredChart } from "./WageredChart";
import { useState } from "react";
import { DateRangeType } from "@core/services/transactions/Transactions";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { PnLChart } from "./PnLChart";

export const StatsBody = () => {
  
  const [dateRange, setDateRange] = useState<DateRangeType>("thisMonth");
  const [category, setCategory] = useState<TransactionCategory | undefined>();
  const [selectedChart, setSelectedChart] = useState<string | undefined>('wagered');

  return (
    <Div
      fx
      column
      gap={40}
    >
      <StatsHeader dateRange={dateRange} setDateRange={setDateRange} category={category} setCategory={setCategory}/>
      <Div fx column gap={16}>
        {selectedChart === 'wagered' && <WageredChart dateRange={dateRange} game={category} />}
        {selectedChart === 'pnl' && <PnLChart dateRange={dateRange} game={category} />}
        <StatsWidgets setSelectedChart={setSelectedChart} />
      </Div>
      <Div fx column>       
        <StatCardGrid/>
      </Div>      
    </Div>
  );
};
