import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { set as setDate } from "date-fns";
import { Validation } from "@core/services/validation";
import { HolidayChest } from "@core/types/rewards/HolidayChest";
import { useForm } from "@client/comps/form/useForm";
import { Toasts } from "@client/services/toasts";
import {
  ConfirmModal,
  waitForConfirmation,
} from "@client/modals/confirm/ConfirmModal";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { CreateHeader } from "./create/CreateHeader";
import { CreateCaseGrid } from "./create/CreateCaseGrid";
import { CreateMenu } from "./create/CreateMenu";

export const HolidayCreatePage = () => {
  const [chests, setChests] = useState<HolidayChest[]>([]);
  const navigate = useNavigate();

  const form = useForm({
    schema: Validation.object({
      displayName: Validation.string().required("Name is required."),
      currencyRate: Validation.number().required("Currency rate required."),
      raffleRate: Validation.number().required("Raffle rate is required."),
      boostRate: Validation.number().required("Boost rate is required."),
      startDate: Validation.date()
        .min(new Date(), "Start date must be in the future.")
        .required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
      adventResetDate: Validation.date().required("Advent date is required."),
      adventBonusFilter: Validation.array()
        .of(Validation.boolean().required())
        .required(),
    }),
    initialValues: {
      currencyRate: 0.01,
      raffleRate: 1,
      boostRate: 1.2,
      adventResetDate: setDate(new Date(), {
        hours: 12,
        minutes: 0,
        milliseconds: 0,
      }),
      adventBonusFilter: Rewards.adventDays.map((x) => false),
    },
    toastSubmitError: true,
    onSubmit: async ({ adventBonusFilter, ...values }) => {
      if (chests.some((x) => x.holidayCost <= 0)) {
        throw new Error("All chests must have a cost greater than 0.");
      }

      const confirmed = await waitForConfirmation({
        heading: "Create Holiday",
        message: "Are you sure you want to create the holiday?",
      });

      if (!confirmed) {
        return;
      }

      const { holiday } = await Rewards.createHoliday({
        ...values,
        chests,
        adventBonusDays: Rewards.adventDays.filter(
          (x, i) => adventBonusFilter[i],
        ),
      });

      Toasts.success("Holiday created.");

      navigate(`/holidays/${holiday._id}`);
    },
  });

  const handleCancel = () => {
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading="Cancel"
        message="Are you sure you want to cancel?"
        onConfirm={() => {
          navigate("/holidays");
        }}
      />,
    );
  };

  return (
    <SitePage
      className="HolidayCreatePage"
      title="Create Holiday"
    >
      <CreateHeader
        isLoading={form.loading}
        onCancelClick={() => handleCancel()}
        onCreateClick={() => form.handleSubmit()}
      />
      <Div gap={24}>
        <CreateMenu form={form} />
        <CreateCaseGrid
          chests={chests}
          setChests={setChests}
        />
      </Div>
    </SitePage>
  );
};
