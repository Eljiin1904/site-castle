import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SingleGameInfoCard } from "./SingleGameInfoCard";
import { Site } from "@core/services/site";
import { Conditional } from "@client/comps/conditional/Conditional";
import { MinesBody } from "./mines/MinesBody";
import { DiceBody } from "./dice/DiceBody";
import { LimboBody } from "./limbo/LimboBody";
import { BlackjackBody } from "./blackjack/BlackjackBody";
import { DoubleBody } from "./double/DoubleBody";
import { DoubleInfoCard } from "./double/DoubleInfoCard";
import { CaseBattlesInfoCard } from "./case-battles/CaseBattlesInfoCard";
import { CaseBattlesBody } from "./case-battles/CaseBattlesBody";
import { CasesBody } from "./cases/CasesBody";
import { ChestKind } from "@core/types/chests/ChestKind";
import { CrashInfoCard } from "./crash/CrashInfoCard";
import { CrashBody } from "./crash/CrashBody";

export const GameFairnessPage = ({game, verificationLink, caseKind}: {
  game: typeof Site.games[number];
  verificationLink: string;
  caseKind?: ChestKind
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const { t } = useTranslation(["fairness"]);

  return (
    <Fragment>
      <Conditional
        value={game}
        mines={<SingleGameInfoCard game="mines" verificationLink={verificationLink} />}
        dice={<SingleGameInfoCard game="dice" verificationLink={verificationLink} />}
        limbo={<SingleGameInfoCard game="limbo" verificationLink={verificationLink} />}
        blackjack={<SingleGameInfoCard game="blackjack" verificationLink={verificationLink} />}
        cases={<SingleGameInfoCard game="cases" verificationLink={verificationLink} />}
        double={<DoubleInfoCard  verificationLink={verificationLink}/>}
        crash={<CrashInfoCard verificationLink={verificationLink} />}
        case-battles={<CaseBattlesInfoCard verificationLink={verificationLink} />}
      />
      {authenticated ? (
        <Div
          fx
          column
          gap={40}
        >
          <Conditional value={game}
            mines={<MinesBody />}
            dice={<DiceBody />}
            limbo={<LimboBody />}
            blackjack={<BlackjackBody />}  
            double={<DoubleBody />}  
            case-battles={<CaseBattlesBody />}   
            cases={<CasesBody kind={caseKind ?? 'case'} />} 
            crash={<CrashBody />}   
          />
        </Div>
      ) : (
        <Div>
          <Button
            kind="secondary-yellow"
            label={t("loginToViewResults")}
            onClick={() =>
              Dialogs.open("primary", <LoginModal initialAction="login" />)
            }
          />
        </Div>
      )}
    </Fragment>
  );
};
