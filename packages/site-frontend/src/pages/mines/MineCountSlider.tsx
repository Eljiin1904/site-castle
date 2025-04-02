import { Slider } from "#client/comps/slider/Slider";
import { Div } from "#client/comps/div/Div";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { ModalField } from "#client/comps/modal/ModalField";
import { Img } from "#client/comps/img/Img";
import { Span } from "#client/comps/span/Span";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Mines } from "#app/services/mines";
import "./MineCountSlider.scss";

export const MineCountSlider = ({ disabled }: { disabled?: boolean }) => {
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const { min, max } = Mines.getMineMinMax(gridSize);
  const dispatch = useAppDispatch();

  return (
    <ModalSection className="MineCountSlider">
      <ModalLabel>{"Mine Count"}</ModalLabel>
      <ModalField
        align="center"
        gap={12}
        px={3}
        py={3}
      >
        <Div
          className="mine-counter"
          center
          py={2}
        >
          <Img
            type="png"
            path="/icons/mines-bomb"
            width="28px"
          />
          <Span
            family="title"
            weight="bold"
            color="white"
            textAlign="center"
            width={22}
            mr={6}
          >
            {mineCount}
          </Span>
        </Div>
        <Slider
          type="single"
          min={min}
          max={max}
          defaultValue={mineCount}
          disabled={disabled}
          value={mineCount}
          onChange={(x) => dispatch(Mines.setMineCount(x))}
        />
        <Div
          className="gem-counter"
          center
          bg="dark-green"
          py={2}
        >
          <Span
            family="title"
            weight="bold"
            color="white"
            textAlign="center"
            width={22}
            ml={6}
          >
            {Mines.getTileCount(gridSize) - mineCount}
          </Span>
          <Img
            type="png"
            path="/icons/mines-gem"
            width="28px"
          />
        </Div>
      </ModalField>
    </ModalSection>
  );
};
