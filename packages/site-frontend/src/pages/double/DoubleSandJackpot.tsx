import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { DoubleJackpotIcon } from "./DoubleJackpotIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Effects } from "#app/services/effects";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useEffect } from "react";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const DoubleSandJackpot = () => {

  const small = useIsMobileLayout();
  const history = useAppSelector((x) => x.double.history);
  const last3 = history.slice(0, 3);

  const fillFirstOne = last3[0]?.color === "red";
  const fillSecondOne = fillFirstOne && last3[1]?.color === "red";
  const fillThirdOne = fillSecondOne && last3[2]?.color === "red";
  
  const {t} = useTranslation(["games\\double"]);
  return (<Div>
      <Div fx gap={16} flexCenter justifyContent={small ? "space-between" : "flex-end"}>
        <Div column alignItems={small ? "flex-start" : "flex-end"}>
          <Span size={12} lineHeight={20} weight="medium" color="dark-sand">{t('games\\double:jackpot')}</Span>
          <Tokens fontSize={20} value={20000000000} decimals={0} />
        </Div>
        <Div gap={8}>
          <DoubleJackpotIcon
            fill={fillFirstOne}
          />
          <DoubleJackpotIcon
            fill={fillSecondOne}
          />
          <DoubleJackpotIcon
            fill={fillThirdOne}
          />
        </Div>
      </Div>
      {fillThirdOne && <DoubleJackpot />}
    </Div>
  );
};

const DoubleJackpot = () => {

  const playSound = useSoundPlayer("double");

  useEffect(() => {

    Effects.manager.play("DoubleJackpot");
    playSound("confetti-jackpot");
  }, []);

  return (<Div className={"DoubleJackpot"} fx fy zIndex={12} position="absolute" />)
};
