import { Fragment, useState } from "react";
import { useInterval } from "usehooks-ts";
import { isPast } from "date-fns";
import { Card } from "@client/comps/cards/Card";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Vector } from "@client/comps/vector/Vector";
import { SvgClock } from "@client/svgs/common/SvgClock";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";

export const BoostCard = ({
  image,
  heading,
  startDate,
  onClaimClick,
}: {
  image: string;
  heading: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onClaimClick: () => void;
}) => {
  const isAvailable = () => startDate && isPast(startDate);

  const [available, setAvailable] = useState(isAvailable());
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  useInterval(() => setAvailable(isAvailable()), 1000);

  return (
    <Card
      fx
      column={!small}
      center
      p={16}
      gap={16}
    >
      <Img
        type="png"
        path={image}
        width={small ? "80px" : "150px"}
      />
      <Div
        fx
        column
        align={small ? undefined : "center"}
        gap={small ? 8 : 16}
      >
        <Span
          family="title"
          weight="bold"
          size={small ? 16 : 18}
          color="white"
        >
          {heading}
        </Span>
        {authenticated ? (
          <Fragment>
            {available ? (
              <Span color="green">{"Available"}</Span>
            ) : startDate ? (
              <Div gap={4}>
                <Vector
                  as={SvgClock}
                  size={14}
                />
                <Timestamp
                  date={startDate}
                  format="timer"
                />
              </Div>
            ) : (
              <Span color="gray">{"Loading"}</Span>
            )}
            <Button
              fx
              size={small ? "xs" : "md"}
              labelSize={small ? 13 : 14}
              kind={available ? "primary" : "secondary"}
              label="Claim Now"
              disabled={!available}
              onClick={onClaimClick}
            />
          </Fragment>
        ) : (
          <Button
            fx
            size={small ? "xs" : "md"}
            labelSize={small ? 13 : 14}
            kind="primary"
            label="Login to Boost"
            onClick={() =>
              Dialogs.open("primary", <LoginModal initialAction="login" />)
            }
          />
        )}
      </Div>
    </Card>
  );
};
