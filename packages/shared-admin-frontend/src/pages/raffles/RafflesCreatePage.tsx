import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LootItem } from "@core/types/items/BasicItem";
import { Validation } from "@core/services/validation";
import { Div } from "@client/comps/div/Div";
import { useForm } from "@client/comps/form/useForm";
import { Toasts } from "@client/services/toasts";
import {
  ConfirmModal,
  waitForConfirmation,
} from "@client/modals/confirm/ConfirmModal";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import { ItemPicker } from "#app/comps/item-picker/ItemPicker";
import { Rewards } from "#app/services/rewards";
import { CreateItemGrid } from "./create/CreateItemGrid";
import { CreateMenu } from "./create/CreateMenu";
import { CreateHeader } from "./create/CreateHeader";

export const RafflesCreatePage = () => {
  const [items, setItems] = useState<LootItem[]>([]);
  const navigate = useNavigate();

  const form = useForm({
    schema: Validation.object({
      displayName: Validation.string().required("Name is required."),
      startDate: Validation.date()
        .min(new Date(), "Start date must be in the future.")
        .required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
    }),
    toastSubmitError: true,
    onSubmit: async (values) => {
      const confirmed = await waitForConfirmation({
        heading: "Create Raffle",
        message: "Are you sure you want to create the raffle?",
      });

      if (!confirmed) {
        return;
      }

      const { raffle } = await Rewards.createRaffle({
        ...values,
        itemIds: items.map((x) => x.id),
      });

      Toasts.success("Raffle created.");

      navigate(`/raffles/${raffle._id}`);
    },
  });

  const handleCancel = () => {
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading="Cancel"
        message="Are you sure you want to cancel?"
        onConfirm={() => {
          navigate("/raffles");
        }}
      />,
    );
  };

  return (
    <SitePage
      className="RafflesCreatePage"
      title="Create Raffle"
    >
      <CreateHeader
        isLoading={form.loading}
        onCancelClick={() => handleCancel()}
        onCreateClick={() => form.handleSubmit()}
      />
      <Div gap={24}>
        <CreateMenu
          items={items}
          form={form}
        />
        <CreateItemGrid
          items={items}
          onItemClick={(item) => {
            const newItems = items.slice();
            const removeIndex = items.findIndex((x) => x.id === item.id);
            newItems.splice(removeIndex, 1);
            setItems(newItems);
          }}
        />
      </Div>
      <ItemPicker
        items={items}
        onItemClick={(item) => {
          setItems((items) => {
            const newItems = items.slice();
            newItems.push(item);
            newItems.sort((a, b) => a.lootValue - b.lootValue);
            return newItems;
          });
        }}
      />
    </SitePage>
  );
};
