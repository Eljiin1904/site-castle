import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { ChestKind } from "@core/types/chests/ChestKind";
import { ImageInputValue } from "@client/comps/input/ImageInput";
import { PageNotice } from "@client/comps/page/PageNotice";
import { PageLoading } from "@client/comps/page/PageLoading";
import { ChestItem } from "@core/types/chests/ChestItem";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { Utility } from "@client/services/utility";
import { Strings } from "@core/services/strings";
import { Toasts } from "@client/services/toasts";
import { Errors } from "@client/services/errors";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Chests } from "#app/services/chests";
import { SitePage } from "#app/comps/site-page/SitePage";
import { ItemPicker } from "#app/comps/item-picker/ItemPicker";
import { ChestMenu } from "./editor/ChestMenu";
import { ChestProfile } from "./editor/ChestProfile";
import { LootTable } from "./editor/LootTable";
import { ChestAction } from "./editor/ChestAction";
interface ChestErrors {
  image: string;
  displayName: string;
  create: string;
}

interface SerializedChest {
  displayName: string;
  items: ChestItem[];
}

export const ChestEditorPage = () => {
  const params = useParams<{ action: ChestAction; chestId: string }>();
  const navigate = useNavigate();

  const [image, setImage] = useState<ImageInputValue>();
  const [displayName, setDisplayName] = useState<string>();
  const [kind, setKind] = useState<ChestKind>("case");
  const [items, setItems] = useState<ChestItem[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Partial<ChestErrors>>({});
  const [isLoading, setIsProcessing] = useState(false);

  const action = params.action!;
  const chestId = params.chestId;

  const query = useQuery({
    enabled: chestId !== undefined,
    queryKey: [chestId],
    queryFn: () =>
      Chests.getChest({
        chestId: chestId!,
      }),
  });

  const chest = query.data?.chest;
  const totalDropRate = items.reduce((acc, x) => (acc += x.dropRate), 0);
  const { estimatedValue, openCost } = Chests.getValue(items);

  const schema = Validation.object({
    imageRequired: Validation.boolean(),
    displayName: Validation.string().required("Display name is required"),
    image: Validation.imageConditional(512, 512),
  });

  useEffect(() => {
    if (chest) {
      setItems(chest.items);
      setDisplayName(chest.displayName);
      setKind(chest.kind);
      setDisabled(chest.disabled);
    }
  }, [chest]);

  const handleCancel = usePost(async () => {
    await waitForConfirmation({
      heading: "Cancel",
      message: "Are you sure you want to cancel?",
    });

    navigate("/chests");
  }, setIsProcessing);

  const handleBack = () => {
    navigate("/chests");
  };

  const handleImport = usePost(async () => {
    const data = await Utility.importJson<Partial<SerializedChest>>();

    if (!data) {
      return;
    }

    if (!data.displayName || !data.items) {
      throw new Error("JSON does not have valid chest data.");
    }

    setDisplayName(data.displayName);
    setItems(data.items);
    Toasts.success("Chest imported.");
  }, setIsProcessing);

  const handleExport = usePost(async () => {
    if (!displayName) {
      throw new Error("You must set a display name before exporting.");
    }

    Utility.exportJson(Strings.toSlug(displayName), { displayName, items });

    Toasts.success("Chest exported.");
  }, setIsProcessing);

  const handleDisable = usePost(async () => {
    const confirmed = await waitForConfirmation({
      heading: "Disable Chest",
      message: "Are you sure you want to disable the chest?",
    });

    if (!confirmed) {
      return;
    }

    await Chests.disableChest({
      chestId: chest!._id,
    });

    setDisabled(true);
    Toasts.success("Chest disabled.");
  }, setIsProcessing);

  const handleEnable = usePost(async () => {
    const confirmed = await waitForConfirmation({
      heading: "Enable Chest",
      message: "Are you sure you want to enable the chest?",
    });

    if (!confirmed) {
      return;
    }

    await Chests.enableChest({
      chestId: chest!._id,
    });

    setDisabled(false);
    Toasts.success("Chest enabled.");
  }, setIsProcessing);

  const handleCreate = usePost(async () => {
    try {
      const imageRequired = action === "create";
      await schema.validate({ imageRequired, image, displayName }, { abortEarly: false });
      setErrors({});
    } catch (e) {
    const error = Validation.getErrors(schema, e);
      return setErrors({ displayName: error.displayName?.key, image: error.image?.key });
    }

    if (Intimal.toDecimal(totalDropRate) !== 1) {
      return setErrors({ create: "Total chance must equal 100%." });
    }

    if (items.some((x) => x.dropRate <= 0)) {
      return setErrors({
        create: "All items must have a drop rate greater than 0.",
      });
    }

    const confirmed = await waitForConfirmation({
      heading: "Create Chest",
      message: "Are you sure you want to create the chest?",
    });

    if (!confirmed) {
      return;
    }

    const { chestId } = await Chests.createChest({
      image: image?.file,
      displayName: displayName!,
      kind,
      items: items.map((x) => ({
        id: x.id,
        dropRate: x.dropRate,
        announce: x.announce,
        jackpot: x.jackpot,
        special: x.special,
      })),
    });

    Toasts.success("Chest created.");
    navigate(`/chests/edit/${chestId}`);
  }, setIsProcessing);

  const handleUpdate = usePost(async () => {
    const confirmed = await waitForConfirmation({
      heading: "Update Chest",
      message: "Are you sure you want to update the chest?",
    });

    if (!confirmed) {
      return;
    }

    await Chests.updateChest({
      chestId: chest!._id,
      image: image?.file,
      displayName: displayName!,
      kind,
      items: items.map((x) => ({
        id: x.id,
        dropRate: x.dropRate,
        announce: x.announce,
        jackpot: x.jackpot,
        special: x.special,
      })),
    });

    query.refetch();

    Toasts.success("Chest updated.");
  }, setIsProcessing);

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-Castle-error"
        title="Error"
        message="Something went wrong, please return to the chest index."
        buttonLabel="Back to Chests"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/chests")}
      />
    );
  } else if (query.isLoading) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <Fragment>
        <ChestMenu
          action={action}
          disabled={disabled}
          isLoading={isLoading}
          onCancelClick={handleCancel}
          onBackClick={handleBack}
          onImportClick={handleImport}
          onExportClick={handleExport}
          onDisableClick={handleDisable}
          onEnableClick={handleEnable}
          onUpdateClick={handleUpdate}
          onCreateClick={handleCreate}
        />
        {disabled && (
          <NoticeCard
            kind="warning"
            message="This chest is currently disabled."
          />
        )}
        {errors.create && (
          <NoticeCard
            kind="error"
            message={errors.create}
          />
        )}
        <ChestProfile
          image={image}
          imageError={errors.image}
          displayName={displayName}
          displayNameError={errors.displayName}
          kind={kind}
          items={items}
          chest={chest}
          estimatedValue={estimatedValue}
          openCost={openCost}
          totalDropRate={totalDropRate}
          setImage={setImage}
          setDisplayName={setDisplayName}
          setKind={setKind}
        />
        <LootTable
          action={action}
          items={items}
          setItems={setItems}
        />
        {action === "create" && (
          <ItemPicker
            items={items}
            onItemClick={(item) => {
              setItems((chests) => {
                const newItems = chests.slice();
                newItems.push({
                  ...item,
                  dropRate: 0,
                  announce: false,
                  jackpot: false,
                  special: false,
                });
                newItems.sort((a, b) => b.lootValue - a.lootValue);
                return newItems;
              });
            }}
          />
        )}
      </Fragment>
    );
  }

  return (
    <SitePage
      className="ChestEditorPage"
      title={action === "create" ? "Create Chest" : "Edit Chest"}
    >
      {bodyContent}
    </SitePage>
  );
};
