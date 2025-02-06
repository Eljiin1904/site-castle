import { DragEndEvent } from "@dnd-kit/core";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Toggle } from "@client/comps/toggle/Toggle";
import { CasePickerModal } from "#app/modals/case-picker/CasePickerModal";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { SortableList } from "#app/comps/sortable-list/SortableList";
import { CaseAddCard } from "./CaseAddCard";
import { CaseCard } from "./CaseCard";
import "./CaseSection.scss";

export const CaseSection = () => {
  const chests = useAppSelector((x) => x.battleCreate.chests);
  const autoSort = useAppSelector((x) => x.battleCreate.autoSort);
  const dispatch = useAppDispatch();

  const totalCount = chests.reduce((acc, x) => (acc += x.count), 0);
  const maxed = totalCount >= CaseBattles.maxRounds;

  const setChestCount = (chest: ChestDocument, count: number | undefined) => {
    dispatch(CaseBattles.setChestCount({ chest, count }));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = chests.findIndex((x) => x._id === active.id);
      const newIndex = chests.findIndex((x) => x._id === over.id);

      dispatch(CaseBattles.setChestOrder({ oldIndex, newIndex }));
    }
  };

  return (
    <Div
      className="CaseSection"
      fx
      column
      gap={16}
    >
      <Div
        justify="space-between"
        mt={8}
      >
        <Div>
          <Heading>{"Cases"}</Heading>
        </Div>
        <Div align="flex-end">
          <Div
            align="center"
            gap={8}
          >
            <Span>{"Auto Sort"}</Span>
            <Toggle
              value={autoSort}
              onChange={(x) => dispatch(CaseBattles.setAutoSort(x))}
            />
          </Div>
        </Div>
      </Div>
      <Div
        className="case-list"
        gap={12}
        flow="row-wrap"
      >
        <SortableList
          items={chests}
          disabled={autoSort}
          renderItem={(chest) => (
            <CaseCard
              key={chest._id}
              chest={chest}
              maxed={maxed}
              quantity={chest.count}
              disableDrag={autoSort}
              setQuantity={(count) => setChestCount(chest, count)}
            />
          )}
          onDragEnd={handleDragEnd}
        />
        {!maxed && (
          <CaseAddCard
            onClick={() => Dialogs.open("primary", <CasePickerModal />)}
          />
        )}
      </Div>
      {maxed && (
        <NoticeCard
          kind="warning"
          message={`You can only add up to ${CaseBattles.maxRounds} cases.`}
        />
      )}
    </Div>
  );
};
