import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { SvgInfinity } from "@client/svgs/common/SvgInfinity";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Limbo } from "#app/services/limbo";
import { BetInputGroup } from "./BetInputGroup";
import { useAutoBet } from "./useAutoBet";
import { useProfit } from "./useProfit";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LimboMenuAuto = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<NotMobileContent />}
      laptop={<NotMobileContent />}
      desktop={<NotMobileContent />}
    />
  );
};

const MobileContent = () => {
  return (
    <Fragment>
      <ActionButton />
      <BaseFields />
    </Fragment>
  );
};

const NotMobileContent = () => {
  return (
    <Fragment>
      <BaseFields />
      <Div
        column
        justify="flex-end"
        gap={8}
      >
        <Div
          fx
          borderTop
        >
          <ActionButton />
        </Div>
      </Div>
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.limbo.processing);
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const { t } = useTranslation(["games\\limbo"]);
  const dispatch = useAppDispatch();

  const { overMax } = useProfit();

  const handleStartAuto = useAutoBet();

  if (autoPlaying) {
    return (
      <Button
        fx
        kind="primary-green"
        label={t("games\\limbo:stopAutoPlay")}
        onClick={() => dispatch(Limbo.setAutoPlaying(false))}
      />
    );
  } else {
    return (
      <Button
        fx
        kind="primary-green"
        label={overMax ? t("games\\limbo:exceedMaxBet") : t("games\\limbo:startAutoPlay")}
        disabled={overMax || processing}
        onClick={handleStartAuto}
      />
    );
  }
};

const BaseFields = () => {
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const gameCount = useAppSelector((x) => x.limbo.gameCount);
  const lossAction = useAppSelector((x) => x.limbo.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.limbo.lossIncreaseBy);
  const lossLimit = useAppSelector((x) => x.limbo.lossLimit);
  const profitLimit = useAppSelector((x) => x.limbo.profitLimit);
  const winAction = useAppSelector((x) => x.limbo.winAction);
  const winIncreaseBy = useAppSelector((x) => x.limbo.winIncreaseBy);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <Fragment>
      <BetInputGroup disabled={autoPlaying} />
      <ModalSection>
        <ModalLabel>{"Games"}</ModalLabel>
        <Input
          type="integer"
          placeholder="0"
          value={gameCount}
          iconRight={gameCount ? undefined : SvgInfinity}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Limbo.setGameCount(x))}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t("fields:bets.onWin")}</ModalLabel>
        <Div
          fx
          align="center"
          gap={8}
        >
          <Div>
            <ButtonGroup
              options={[t("common:reset"), t("common:increase")]}
              size="xs"
              value={["reset", "increase"].indexOf(winAction)}
              disabled={autoPlaying}
              setValue={(x) => dispatch(Limbo.setWinAction(x === 0 ? "reset" : "increase"))}
            />
          </Div>

          <Input
            type="decimal"
            placeholder="0.00"
            value={winIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || winAction !== "increase"}
            onChange={(x) => dispatch(Limbo.setWinIncreaseBy(x))}
          />
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t("fields:bets.onLoss")}</ModalLabel>
        <Div
          fx
          align="center"
          gap={8}
        >
          <Div>
            <ButtonGroup
              options={[t("common:reset"), t("common:increase")]}
              size="xs"
              labelSize={13}
              value={["reset", "increase"].indexOf(lossAction)}
              disabled={autoPlaying}
              setValue={(x) => dispatch(Limbo.setLossAction(x === 0 ? "reset" : "increase"))}
            />
          </Div>
          <Input
            type="decimal"
            placeholder="0.00"
            value={lossIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || lossAction !== "increase"}
            onChange={(x) => dispatch(Limbo.setLossIncreaseBy(x))}
          />
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Stop on Profit"}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={profitLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Limbo.setProfitLimit(x))}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Stop on Loss"}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={lossLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Limbo.setLossLimit(x))}
        />
      </ModalSection>
    </Fragment>
  );
};
