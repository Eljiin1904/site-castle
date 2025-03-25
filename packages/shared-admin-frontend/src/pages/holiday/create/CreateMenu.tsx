import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { UseFormReturn } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Rewards } from "#app/services/rewards";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const CreateMenu = ({
  form,
}: {
  form: UseFormReturn<{
    displayName: string;
    currencyRate: number;
    raffleRate: number;
    boostRate: number;
    startDate: Date;
    endDate: Date;
    adventResetDate: Date;
    adventBonusFilter: boolean[];
  }>;
}) => {
  const adventBonusFilter = form.values.adventBonusFilter || [];
  const { t } = useTranslation(["validations"]);

  return (
    <Div
      border
      bg="brown-6"
      style={{ minWidth: "350px", minHeight: "740px" }}
    >
      <Form form={form}>
        <ModalBody overflow={undefined}>
          <ModalSection>
            <ModalLabel>{"Display name"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter display name..."
              disabled={form.loading}
              error={
                form.errors.displayName?.key
                  ? t(form.errors.displayName.key, { value: form.errors.displayName.value })
                  : undefined
              }
              value={form.values.displayName}
              onChange={(x) => form.setValue("displayName", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Start Date"}</ModalLabel>
            <Input
              type="date"
              format="MM/dd/yyyy, HH:mm"
              placeholder="Enter start date..."
              showTimeSelect
              disabled={form.loading}
              error={
                form.errors.startDate?.key
                  ? t(form.errors.startDate.key, { value: form.errors.startDate.value })
                  : undefined
              }
              value={form.values.startDate}
              onChange={(x) => form.setValue("startDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"End Date"}</ModalLabel>
            <Input
              type="date"
              format="MM/dd/yyyy, HH:mm"
              placeholder="Enter end date..."
              showTimeSelect
              disabled={form.loading}
              error={
                form.errors.endDate?.key
                  ? t(form.errors.endDate.key, { value: form.errors.endDate.value })
                  : undefined
              }
              value={form.values.endDate}
              onChange={(x) => form.setValue("endDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"XP to Currency Rate"}</ModalLabel>
            <Input
              type="decimal"
              decimals={2}
              placeholder="Enter currency rate..."
              disabled={form.loading}
              error={
                form.errors.currencyRate?.key
                  ? t(form.errors.currencyRate.key, { value: form.errors.currencyRate.value })
                  : undefined
              }
              value={form.values.currencyRate}
              onChange={(x) => form.setValue("currencyRate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Currency to Raffle Rate"}</ModalLabel>
            <Input
              type="decimal"
              decimals={2}
              placeholder="Enter raffle rate..."
              disabled={form.loading}
              error={
                form.errors.raffleRate?.key
                  ? t(form.errors.raffleRate.key, { value: form.errors.raffleRate.value })
                  : undefined
              }
              value={form.values.raffleRate}
              onChange={(x) => form.setValue("raffleRate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Boost Rate"}</ModalLabel>
            <Input
              type="decimal"
              decimals={2}
              placeholder="Enter boost rate..."
              disabled={form.loading}
              error={
                form.errors.boostRate?.key
                  ? t(form.errors.boostRate.key, { value: form.errors.boostRate.value })
                  : undefined
              }
              value={form.values.boostRate}
              onChange={(x) => form.setValue("boostRate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Advent Reset Hour"}</ModalLabel>
            <Input
              type="date"
              format="h:mm aa"
              placeholder="Enter advent reset hour..."
              showTimeSelect
              showTimeSelectOnly
              disabled={form.loading}
              error={
                form.errors.adventResetDate?.key
                  ? t(form.errors.adventResetDate.key, { value: form.errors.adventResetDate.value })
                  : undefined
              }
              value={form.values.adventResetDate}
              onChange={(x) => form.setValue("adventResetDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Advent Bonus Days"}</ModalLabel>
            <Dropdown
              type="filter"
              fx
              label={Rewards.adventDays.filter((x, i) => adventBonusFilter[i]).join(", ") || "None"}
              options={Rewards.adventDays.map((x) => x.toString())}
              filter={adventBonusFilter}
              disabled={form.loading}
              onChange={(x) => form.setValue("adventBonusFilter", x)}
            />
          </ModalSection>
        </ModalBody>
      </Form>
    </Div>
  );
};
