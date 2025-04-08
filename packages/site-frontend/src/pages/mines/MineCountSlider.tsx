import { Slider } from "@client/comps/slider/Slider";
import { Div } from "@client/comps/div/Div";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalField } from "@client/comps/modal/ModalField";
import { Span } from "@client/comps/span/Span";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Mines } from "#app/services/mines";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Vector } from "@client/comps/vector/Vector";
import { SvgDiamond } from "#app/svgs/mines/SvgDiamond";
import { SvgBomb } from "#app/svgs/mines/SvgBomb";
import classNames from "classnames";
import { SvgMineSlider } from "#app/svgs/mines/SvgMineSlider";
import "./MineCountSlider.scss";


export const MineCountSlider = ({ disabled }: { disabled?: boolean }) => {
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const { min, max } = Mines.getMineMinMax(gridSize);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);

  return (
    <ModalSection className="MineCountSlider" mb={16}>
      <ModalLabel>{t('mineCount')}</ModalLabel>
      <ModalField
        align="center"
        gap={12}
        borderColor="brown-4"
        height={40}
        justifyContent="space-between"
        className={classNames("MinesGameInput", {disabled})}
      >
        <Div
          className="mine-counter"
          center
          gap={8}
        >
          <Vector as={SvgDiamond} color="bright-green" width="28px" />
          <Span
            family="title"
            color="light-sand"
          >
            {Mines.getTileCount(gridSize) - mineCount}
          </Span>
        </Div>
        <Slider
          type="single"
          min={min}
          max={max}
          defaultValue={mineCount}
          disabled={disabled}
          value={Mines.getTileCount(gridSize) - mineCount}
          onChange={(x) => dispatch(Mines.setMineCount(Mines.getTileCount(gridSize) - x))}
          handleRender={(node) => (
            <div {...node.props}>
              <Div center bg="light-sand" p={8} width={8} height={8} borderRadius={"full"}>
                <Vector
                  as={SvgMineSlider}
                  size={14}
                />
              </Div>
            </div>
          )}
        />
        <Div
          className="gem-counter"
          center
          py={2}
        >
          <Span
            family="title"
            color="light-sand"
            textAlign="center"
            width={22}            
          >
            { mineCount}
          </Span>
          <Vector as={SvgBomb} color="double-red" width="28px" />
        </Div>
      </ModalField>
    </ModalSection>
  );
};
