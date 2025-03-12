import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMinusCircle } from "@client/svgs/common/SvgMinusCircle";
import { SvgPlusCircle } from "@client/svgs/common/SvgPlusCircle";
import { Rewards } from "#app/services/rewards";

export const RaceCreateModal = ({
  payouts: initPayouts,
  onSuccess,
}: {
  payouts?: number[];
  onSuccess?: () => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      displayName: Validation.string().required("Name is required."),
      payouts: Validation.array()
        .of(Validation.currency("amount").required())
        .required("Payouts are required."),
      startDate: Validation.date()
        .min(new Date(), "Start date must be in the future.")
        .required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
      forHoliday: Validation.boolean(),
    }),
    initialValues: {
      payouts: initPayouts || Array(20).fill(0),
    },
    onSubmit: async (values) => {
      await Rewards.createRace(values);
      onSuccess && onSuccess();
      Toasts.success("Race created.");
      Dialogs.close("primary");
    },
  });

  const payouts = form.values.payouts || [];

  const resizePayouts = (inc: number) => {
    const newSize = Math.max(10, payouts.length + inc);
    const newPayouts = [...Array(newSize)].map(
      (x, i) => payouts[i] || payouts[payouts.length - 1],
    );
    form.setValue("payouts", newPayouts);
  };

  return (
    <Modal onBackdropClick={() => Dialogs.close("primary")}>
      <ModalHeader
        heading="Create Race"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Race name"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter race name..."
              disabled={form.loading}
              error={form.errors.displayName}
              value={form.values.displayName}
              onChange={(x) => form.setValue("displayName", x)}
            />
          </ModalSection>
          <Div gap={12}>
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
          </Div>
          <ModalSection>
            <Checkbox
              label="For Holiday (Temp)"
              value={form.values.forHoliday}
              onChange={(x) => form.setValue("forHoliday", x)}
            />
          </ModalSection>
          <ModalSection>
            <Div
              fx
              mb={8}
            >
              <Div grow>
                <Div display="block">
                  <Span
                    weight="semi-bold"
                    color="white"
                  >
                    {"Payouts "}
                  </Span>
                  <Span>{"["}</Span>
                  <Span color="light-blue">{payouts.length}</Span>
                  <Span>{"]"}</Span>
                </Div>
                <Tokens
                  value={payouts.reduce((acc, value) => (acc += value), 0)}
                  ml={8}
                />
              </Div>
              <Div gap={8}>
                <Vector
                  as={SvgPlusCircle}
                  size={17}
                  hover="highlight"
                  onClick={() => resizePayouts(1)}
                />
                <Vector
                  as={SvgMinusCircle}
                  size={17}
                  hover="highlight"
                  onClick={() => resizePayouts(-1)}
                />
              </Div>
            </Div>
            <Div
              column
              py={8}
              gap={6}
              overflow="auto"
              borderTop
              borderBottom
              style={{ maxHeight: "480px" }}
            >
              {payouts.map((value, index) => (
                <Div
                  key={index}
                  align="center"
                >
                  <Input
                    type="currency"
                    placeholder={`#${index + 1} Payout`}
                    disabled={form.loading}
                    error={form.errors.payouts}
                    value={value}
                    style={{ minHeight: "40px" }}
                    onChange={(x) => {
                      const newPayouts = payouts.slice();
                      newPayouts[index] = x || 0;
                      form.setValue("payouts", newPayouts);
                    }}
                  />
                  <Div
                    position="absolute"
                    right={10}
                  >
                    <Span
                      size={13}
                      color="dark-gray"
                    >{`#${index + 1}`}</Span>
                  </Div>
                </Div>
              ))}
            </Div>
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Create Race"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
