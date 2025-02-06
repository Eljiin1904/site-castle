import { FC, memo } from "react";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Toggle } from "@client/comps/toggle/Toggle";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { SvgFast } from "@client/svgs/common/SvgFast";
import "./ChestMenu.scss";

type ChestMenuProps = {
  chest: ChestDocument;
  openCount: number;
  fast: boolean;
  specialEnabled: boolean;
  cost: ((openCount: number) => JSX.Element) | undefined;
  disableMultiOpen: boolean | undefined;
  disableControls: boolean;
  setOpenCount: (x: number) => void;
  setFast: (x: boolean) => void;
  setSpecial: (x: boolean) => void;
  onDemoClick: () => void;
  onOpenClick: () => void;
};

export const ChestMenu: FC<ChestMenuProps> = memo((props) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="ChestMenu"
      fx
    >
      <Conditional
        value={mainLayout}
        mobile={<MobileMenu {...props} />}
        tablet={<NotMobileMenu {...props} />}
        laptop={<NotMobileMenu {...props} />}
        desktop={<NotMobileMenu {...props} />}
      />
    </Div>
  );
});

const MobileMenu: FC<ChestMenuProps> = ({
  chest,
  openCount,
  fast,
  specialEnabled,
  cost,
  disableMultiOpen,
  disableControls,
  setOpenCount,
  setFast,
  setSpecial,
  onDemoClick,
  onOpenClick,
}) => {
  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        gap={16}
      >
        <ButtonGroup
          className="count-menu"
          fx
          fill
          options={["1", "2", "3", "4"]}
          value={openCount - 1}
          disabled={disableMultiOpen || disableControls}
          setValue={(i) => setOpenCount(i + 1)}
        />
        <Button
          kind="secondary"
          label="Demo"
          disabled={disableControls}
          onClick={onDemoClick}
        />
      </Div>
      <Div
        fx
        gap={16}
      >
        <Button
          kind="primary"
          label="Open Case"
          fx
          disabled={disableControls}
          onClick={onOpenClick}
        />
      </Div>
      <Div
        fx
        gap={16}
      >
        <Div
          align="center"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Quick Spin"
        >
          <Vector
            as={SvgFast}
            size={18}
            mr={6}
          />
          <Toggle
            value={fast}
            disabled={disableControls}
            onChange={setFast}
          />
        </Div>
        <Div
          align="center"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Chicken Spin"
        >
          <Vector
            as={SvgChicken}
            size={20}
            mr={6}
          />
          <Toggle
            value={specialEnabled}
            disabled={disableControls}
            onChange={setSpecial}
          />
        </Div>
        {cost ? (
          cost(openCount)
        ) : (
          <Div
            fx
            justify="flex-end"
            align="center"
            gap={8}
          >
            <Span size={13}>{"Total Cost"}</Span>
            <Tokens value={chest.openCost * openCount} />
          </Div>
        )}
      </Div>
    </Div>
  );
};

const NotMobileMenu: FC<ChestMenuProps> = ({
  chest,
  openCount,
  fast,
  specialEnabled,
  cost,
  disableMultiOpen,
  disableControls,
  setOpenCount,
  setFast,
  setSpecial,
  onDemoClick,
  onOpenClick,
}) => {
  return (
    <Div fx>
      <Div
        fx
        justify="flex-start"
        gap={16}
      >
        <ButtonGroup
          className="count-menu"
          options={["1", "2", "3", "4"]}
          value={openCount - 1}
          disabled={disableMultiOpen || disableControls}
          setValue={(i) => setOpenCount(i + 1)}
        />
        {cost ? cost(openCount) : <Tokens value={chest.openCost * openCount} />}
      </Div>
      <Div
        fx
        justify="center"
      >
        <Button
          kind="primary"
          label="Open Case"
          disabled={disableControls}
          style={{ minWidth: "160px" }}
          onClick={onOpenClick}
        />
      </Div>
      <Div
        fx
        justify="flex-end"
        gap={12}
      >
        <Div
          align="center"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Quick Spin"
        >
          <Vector
            as={SvgFast}
            size={18}
            mr={6}
          />
          <Toggle
            value={fast}
            disabled={disableControls}
            onChange={setFast}
          />
        </Div>
        <Div
          align="center"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Chicken Spin"
        >
          <Vector
            as={SvgChicken}
            size={20}
            mr={6}
          />
          <Toggle
            value={specialEnabled}
            disabled={disableControls}
            onChange={setSpecial}
          />
        </Div>
        <Button
          kind="secondary"
          label="Demo"
          disabled={disableControls}
          onClick={onDemoClick}
        />
      </Div>
    </Div>
  );
};
