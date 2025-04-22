import { useQuery } from "@tanstack/react-query";
import SumsubWebSdk from "@sumsub/websdk-react";
import { Spinner } from "@client/comps/spinner/Spinner";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { useErrorToast } from "@client/hooks/toasts/useErrorToast";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";

export const VerificationThreeContents = ({
  disableClose,
}: {
  disableClose?: boolean;
}) => {
  const email = useAppSelector((x) => x.user.email);

  const query = useQuery({
    queryKey: [],
    queryFn: () => Users.getSumsubToken(),
  });

  useErrorToast(query.error);

  const accessToken = query.data?.token;

  if (!accessToken) {
    return (
      <Div
        center
        py={64}
      >
        <Spinner size={64} />
      </Div>
    );
  } else {
    return (
      <SumsubWebSdk
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
        }}
        accessToken={accessToken}
        expirationHandler={query.refetch}
        config={{ lang: "en", email }}
        options={{ addViewportTag: false, adaptIframeHeight: true }}
        onMessage={(m: any) => {
          if (m === "idCheck.onApplicantSubmitted") {
            Toasts.info(
              "Processing, we will notify you with the results within 5 minutes.",
            );
            if (!disableClose) {
              Dialogs.close("primary");
            }
          }
        }}
        onError={(e: any) => {
          Toasts.error("Unknown issue");
        }}
      />
    );
  }
};
