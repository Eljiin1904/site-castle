import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { SvgInfinity } from "@client/svgs/common/SvgInfinity";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dice } from "#app/services/dice";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useProfit } from "./useProfit";
import { useAutoBet } from "./useAutoBet";

export const DiceMenuAuto = () => {
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
        grow
        column
        justify="flex-end"
        gap={8}
      >
        <Div
          fx
          borderTop
          pt={16}
        >
          <ActionButton />
        </Div>
      </Div>
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.dice.processing);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const dispatch = useAppDispatch();

  const { overMax } = useProfit();

  const handleStartAuto = useAutoBet();

  if (autoPlaying) {
    return (
      <Button
        fx
        kind="primary"
        label="Stop Auto Play"
        onClick={() => dispatch(Dice.setAutoPlaying(false))}
      />
    );
  } else {
    return (
      <Button
        fx
        kind="primary"
        label={overMax ? "Exceeds Max Profit" : "Start Auto Play"}
        disabled={overMax || processing}
        onClick={handleStartAuto}
      />
    );
  }
};

const BaseFields = () => {
  const gameCount = useAppSelector((x) => x.dice.gameCount);
  const winAction = useAppSelector((x) => x.dice.winAction);
  const winIncreaseBy = useAppSelector((x) => x.dice.winIncreaseBy);
  const lossAction = useAppSelector((x) => x.dice.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.dice.lossIncreaseBy);
  const profitLimit = useAppSelector((x) => x.dice.profitLimit);
  const lossLimit = useAppSelector((x) => x.dice.lossLimit);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const dispatch = useAppDispatch();

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
          onChange={(x) => dispatch(Dice.setGameCount(x))}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"On Win"}</ModalLabel>
        <Div
          fx
          align="center"
        >
          <Input
            type="decimal"
            placeholder="0.00"
            value={winIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || winAction !== "increase"}
            onChange={(x) => dispatch(Dice.setWinIncreaseBy(x))}
            style={{ paddingLeft: "182px" }}
          />
          <Div
            position="absolute"
            left={4}
          >
            <ButtonGroup
              options={["Reset", "Increase By"]}
              size="xs"
              labelSize={13}
              value={["reset", "increase"].indexOf(winAction)}
              disabled={autoPlaying}
              setValue={(x) =>
                dispatch(Dice.setWinAction(x === 0 ? "reset" : "increase"))
              }
            />
          </Div>
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"On Loss"}</ModalLabel>
        <Div
          fx
          align="center"
        >
          <Input
            type="decimal"
            placeholder="0.00"
            value={lossIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || lossAction !== "increase"}
            onChange={(x) => dispatch(Dice.setLossIncreaseBy(x))}
            style={{ paddingLeft: "182px" }}
          />
          <Div
            position="absolute"
            left={4}
          >
            <ButtonGroup
              options={["Reset", "Increase By"]}
              size="xs"
              labelSize={13}
              value={["reset", "increase"].indexOf(lossAction)}
              disabled={autoPlaying}
              setValue={(x) =>
                dispatch(Dice.setLossAction(x === 0 ? "reset" : "increase"))
              }
            />
          </Div>
        </Div>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Stop on Profit"}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={profitLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Dice.setProfitLimit(x))}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Stop on Loss"}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={lossLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Dice.setLossLimit(x))}
        />
      </ModalSection>
    </Fragment>
  );
};
