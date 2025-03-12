import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { BasicChest } from "@core/types/chests/BasicChest";
import { ChestKind } from "@core/types/chests/ChestKind";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Catalog } from "@client/comps/catalog/Catalog";
import { Div } from "@client/comps/div/Div";
import { Chests } from "#app/services/chests";
import { PickerHeader } from "./PickerHeader";
import { PickerCardPlaceholder, PickerCard } from "./PickerCard";

export const ChestPickerModal = ({
  kind,
  chests: initChests,
  onChestClick,
}: {
  kind: ChestKind;
  chests: (BasicChest | ChestDocument)[];
  onChestClick: (x: ChestDocument) => void;
}) => {
  const limit = 12;
  const [chests, setChests] = useState(initChests.slice());
  const [searchText, setSearchText] = useState<string>();
  const [priceIndex, setPriceIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);

  const query = useInfiniteQuery({
    queryKey: ["picker-chests", kind, searchText, priceIndex, sortIndex, limit],
    queryFn: ({ pageParam: page }) =>
      Chests.getChests({
        kind,
        searchText,
        priceIndex,
        sortIndex,
        limit,
        page,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.chests.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  return (
    <Modal
      className="ChestPickerModal"
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
                disabled={chests.some((other) => {
                  if ("_id" in other) {
                    return other._id === chest._id;
                  } else {
                    return other.id === chest._id;
                  }
                })}
                onClick={() => {
                  chests.push(chest);
                  setChests(chests.slice());
                  onChestClick(chest);
                }}
              />
            )}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};
