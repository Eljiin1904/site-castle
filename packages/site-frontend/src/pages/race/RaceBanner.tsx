import { RaceState } from "@core/types/rewards/RaceState";
import { Div } from "@client/comps/div/Div";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { PageBanner } from "#app/comps/site-page/PageBanner";

export const RaceBanner = ({ race }: { race: RaceState }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  return (
    <PageBanner
      image="/graphics/race-banner"
      heading={`${race.displayName}!`}
      description="Wager the most to win huge prizes. Bet big and bet fast, or get left behind!"
      content={
        <Div gap={8}>
          <Div
            display="block"
            px={12}
            py={8}
            bg="brown-8"
            border
            borderColor="light-purple"
            style={{ width: "164px" }}
          >
            <Span>{"Ends in "}</Span>
            <Timestamp
              format="timer"
              date={race.endDate}
            />
          </Div>
          {authenticated && (
            <Link
              type="router"
              to="/rewards/claim"
              hover="none"
            >
              <Button
                kind="primary"
                label="View Wins"
              />
            </Link>
          )}
        </Div>
      }
    />
  );
};
