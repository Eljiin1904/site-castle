import { LootItem } from "@core/types/items/BasicItem";
import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { UseFormReturn } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const CreateMenu = ({
  items,
  form,
}: {
  items: LootItem[];
  form: UseFormReturn<{
    displayName: string;
    startDate: Date;
    endDate: Date;
  }>;
}) => {
  const { t } = useTranslation(["validations"]);

  return (
    <Div
      border
      bg="brown-6"
      style={{ minWidth: "350px", minHeight: "770px" }}
    >
      <Form form={form}>
        <ModalBody overflow={undefined}>
          <ModalSection>
            <ModalLabel>{"Raffle name"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter raffle name..."
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
            <ModalLabel>{"Raffle Value"}</ModalLabel>
            <ModalField>
              <Tokens value={items.reduce((acc, x) => (acc += x.lootValue), 0)} />
            </ModalField>
          </ModalSection>
        </ModalBody>
      </Form>
    </Div>
  );
};
