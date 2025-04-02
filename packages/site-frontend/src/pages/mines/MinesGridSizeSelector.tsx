import { Dropdown } from "#client/comps/dropdown/Dropdown";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { SvgCategory } from "#client/svgs/common/SvgCategory";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Mines } from "#app/services/mines";

export const MinesGridSizeSelector = ({ disabled }: { disabled?: boolean }) => {
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const dispatch = useAppDispatch();

  const handleGridSizeChange = (index: number) => {
    dispatch(Mines.setGridSize(Mines.gridSizes[index]));
  };

  return (
    <ModalSection>
      <ModalLabel>{"Grid Size"}</ModalLabel>
      <Dropdown
        disabled={disabled}
        type="select"
        options={Mines.gridSizes.slice().map((size) => `${size} x ${size}`)}
        value={Mines.gridSizes.indexOf(gridSize)}
        icon={SvgCategory}
        onChange={(x, i) => handleGridSizeChange(i)}
      />
    </ModalSection>
  );
};
