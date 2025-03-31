import { FC, Fragment, memo } from "react";
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
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { ModalDivider } from "@client/comps/modal/ModalDivider";

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
  const small = useIsMobileLayout();

  return (<Div wrap style={
    small
        ? undefined
        : {
            minWidth: "320px",
            maxWidth: "320px",
          }
    }>
      <Div
            column
            p={small? 20 : 24}
            gap={24}
            bg="brown-6"
            fx
            style={
              small
                ? undefined
                : {
                    minHeight: "495px",
                    maxHeight: "495px",
                  }
            }
          >
          <Conditional
            value={mainLayout}
            mobile={<MobileMenu {...props} />}
            tablet={<NotMobileMenu {...props} />}
            laptop={<NotMobileMenu {...props} />}
            desktop={<NotMobileMenu {...props} />}
          />
        </Div>
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
    <Fragment>
      <Div
        fx
        gap={24}
        column
        flexCenter
      >
        <Div
          className="image-ctn"
          center
        >
          <Img
            type="png"
            path={`/chests/${chest.imageId}`}
            width="auto"
            height="78px"
            alt={`${chest.displayName} Thumbnail`}
          />
        </Div>
        <Heading as="h1" fontSize={24} fontWeight="regular">{chest.displayName}</Heading>
        {cost ? cost(openCount) : <Tokens color="dark-sand" fontSize={16} value={chest.openCost * openCount} />}
        <ButtonGroup
          className="count-menu"
          options={["1", "2", "3", "4"]}
          value={openCount - 1}
          disabled={disableMultiOpen || disableControls}
          setValue={(i) => setOpenCount(i + 1)}
          gap={12}
        />       
      </Div>
      <Div
        align="center"
        data-tooltip-id="app-tooltip"
        data-tooltip-content="Quick Spin"
        fx
        justifyContent="space-between"
      >
        <Span fontSize={16}>Fast Spins</Span>
        <Toggle
          value={fast}
          disabled={disableControls}
          onChange={setFast}
        />
      </Div>
      <Div
        fx
        borderTop
        borderColor="brown-4"
      />
      <Div column fx gap={16}>
        <Button
          kind="primary-yellow"
          label="Open Case"
          disabled={disableControls}
          style={{ minWidth: "160px" }}
          onClick={onOpenClick}
        />
        <Button
          fx
          kind="tertiary-grey"
          label="Demo Spin"
          disabled={disableControls}
          onClick={onDemoClick}
        />
      </Div>
    </Fragment>
  );
};
