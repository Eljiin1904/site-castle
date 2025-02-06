import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Catalog } from "@client/comps/catalog/Catalog";
import { Div } from "@client/comps/div/Div";
import { ModalFooter } from "@client/comps/modal/ModalFooter";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Cases } from "#app/services/cases";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { PickerHeader } from "./PickerHeader";
import { PickerCardPlaceholder, PickerCard } from "./PickerCard";

export const CasePickerModal = () => {
  const limit = 12;
  const [searchText, setSearchText] = useState<string>();
  const [priceIndex, setPriceIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);

  const chests = useAppSelector((x) => x.battleCreate.chests);
  const dispatch = useAppDispatch();

  const totalCount = chests.reduce((acc, x) => (acc += x.count), 0);
  const totalValue = chests.reduce(
    (acc, x) => (acc += x.openCost * x.count),
    0,
  );
  const maxed = totalCount >= CaseBattles.maxRounds;

  const query = useInfiniteQuery({
    queryKey: ["picker-cases", searchText, priceIndex, sortIndex, limit],
    queryFn: ({ pageParam: page }) =>
      Cases.getCases({
        searchText,
        priceIndex,
        sortIndex,
        limit,
        page,
        withItems: true,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.chests.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  const setChestCount = (chest: ChestDocument, count: number | undefined) => {
    dispatch(CaseBattles.setChestCount({ chest, count }));
  };

  return (
    <Modal
      className="CasePickerModal"
      width="xl"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Select Cases"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody
        overflow="hidden"
        gap={16}
      >
        <PickerHeader
          searchText={searchText}
          priceIndex={priceIndex}
          sortIndex={sortIndex}
          setSearchText={setSearchText}
          setPriceIndex={setPriceIndex}
          setSortIndex={setSortIndex}
        />
        <Div
          fx
          overflow="auto"
        >
          <Catalog
            pages={query.data?.pages?.map((x) => x.chests)}
            pageSize={limit}
            isFetching={query.isFetching}
            emptyMessage="No cases found."
            hasNextPage={query.hasNextPage}
            fetchNextPage={query.fetchNextPage}
            placeholderRenderer={(key) => <PickerCardPlaceholder key={key} />}
            itemRenderer={(chest, i) => (
              <PickerCard
                key={chest._id}
                chest={chest}
                maxed={maxed}
                quantity={
                  chests.find((other) => chest._id === other._id)?.count
                }
                setQuantity={(count) => setChestCount(chest, count)}
              />
            )}
          />
        </Div>
      </ModalBody>
      <ModalFooter gap={12}>
        <Div
          grow
          align="center"
          gap={8}
        >
          <Span>{`${totalCount} Cases`}</Span>
          <Tokens value={totalValue} />
        </Div>
        <Button
          kind="primary"
          label="Complete"
          onClick={() => Dialogs.close("primary")}
        />
      </ModalFooter>
    </Modal>
  );
};
