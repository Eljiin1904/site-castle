import { ChestLootTable } from "#app/comps/chest-loot/ChestLootTable";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Tokens } from "@client/comps/tokens/Tokens";

export const CasePickerInspector = ({ chest }: { chest: ChestDocument }) => {
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Modal
      width="lg"
      onBackdropClick={() => Dialogs.close("secondary")}
    >
      <ModalHeader
        heading={chest.displayName}
        headerContent={<Tokens value={chest.openCost} />}
        onCloseClick={() => Dialogs.close("secondary")}
      />
      <ModalBody>
        <ChestLootTable
          chest={chest}
          layout={bodyLayout === "mobile" ? "mobile" : "tablet"}
        />
      </ModalBody>
    </Modal>
  );
};
