import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Cryptos } from "#app/services/cryptos";
import { GasStationTable } from "./GasStationTable";

export const GasStationSection = () => {
  const query = useQuery({
    queryKey: ["gas-station"],
    queryFn: () => Cryptos.getGasStationAssets(),
    placeholderData: (prev) => prev,
  });

  const assets = query.data?.assets || [];

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        align="center"
      >
        <Div grow>
          <Heading>{"Gas Station"}</Heading>
        </Div>
        <Div>
          <Button
            kind="secondary"
            icon={SvgRedo}
            onClick={query.refetch}
          />
        </Div>
      </Div>
      <GasStationTable
        assets={assets}
        isLoading={query.isFetching}
      />
    </Div>
  );
};
