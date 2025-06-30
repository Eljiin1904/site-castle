import { RaceState } from "@core/types/rewards/RaceState";
import { Div } from "@client/comps/div/Div";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const RaceBannerOld = ({ race }: { race: RaceState }) => {
  
  const {t} = useTranslation(['pages/race'])
  const authenticated = useAppSelector((x) => x.user.authenticated);
  
  return (
    <PageBanner
      image="/graphics/race-tile"
      heading={`${race.displayName}!`}
      description={t('description')}
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

/**
 * Race Banner, contains the banner image, the race name and description,
 * Show how much time is left on the race.
 * @returns 
 */
export const RaceBanner = ({ race }: { race: RaceState }) => {

  const {t} = useTranslation(['pages/race']);
  const small = useIsMobileLayout();
  
  return (<PageBanner image={`/graphics/race-tile`} height={184} smallHeight={small ? 160: 120} heading={race.displayName} description={t('description')} content={<Div pt={small? 0: 4} alignItems="center" justifyContent="space-between">
    <Div gap={8}>
          <Span size={small? 12: 16} color="dark-brown" >{t('endTime')}</Span>
          <Timestamp
              format="timer"
              date={race.endDate}
              color="dark-brown"
              fontSize={small? 12: 16}
            />
        </Div>
    </Div>
  }/>);
};
