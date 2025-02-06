import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Intimal } from "@core/services/intimal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Economy } from "#app/services/economy";
import { Div } from "@client/comps/div/Div";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";

export const LimitSection = () => {
  const tipLimit = useAppSelector((x) => x.user.meta.tipLimit);

  const query = useQuery({
    enabled: tipLimit != undefined,
    queryKey: [tipLimit],
    queryFn: () => Economy.getTipUsage(),
  });

  const error = query.error;

  useEffect(() => {
    if (error) {
      Toasts.error(error);
    }
  }, [error]);

  if (!tipLimit) {
    return null;
  }

  const tipUsage = query.data?.tipUsage;

  return (
    <Div
      fx
      column
      gap={8}
      pb={20}
      borderBottom
    >
      <Span>{"Daily Limit Used"}</Span>
      <ProgressBar
        progress={tipUsage ? tipUsage / tipLimit : 0}
        height={8}
        fillColor="green"
      />
      {tipUsage != undefined ? (
        <Span color="white">{`${Intimal.toLocaleString(tipUsage)} / ${Intimal.toLocaleString(tipLimit)}`}</Span>
      ) : (
        <Span color="dark-gray">{"Loading..."}</Span>
      )}
    </Div>
  );
};
