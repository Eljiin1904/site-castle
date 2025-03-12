import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { UseFormReturn } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Rewards } from "#app/services/rewards";

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
              error={form.errors.displayName}
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
              error={form.errors.startDate}
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
              error={form.errors.endDate}
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
              error={form.errors.currencyRate}
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
              error={form.errors.raffleRate}
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
              error={form.errors.boostRate}
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
              error={form.errors.adventResetDate}
              value={form.values.adventResetDate}
              onChange={(x) => form.setValue("adventResetDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Advent Bonus Days"}</ModalLabel>
            <Dropdown
              type="filter"
              fx
              label={
                Rewards.adventDays
                  .filter((x, i) => adventBonusFilter[i])
                  .join(", ") || "None"
              }
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
