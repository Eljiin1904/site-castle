import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { useForm } from "@client/comps/form/useForm";
import { Form } from "@client/comps/form/Form";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useWithdraw } from "./useWithdraw";

export const WithdrawForm = () => {
  const vaultBalance = useAppSelector((x) => x.user.vaultBalance || 0);

  const handleWithdraw = useWithdraw();

  const form = useForm({
    schema: Validation.object({
      tokenAmount: Validation.currency("Withdraw amount"),
    }),
    onSubmit: handleWithdraw,
  });

  return (
    <Form form={form}>
      <ModalSection>
        <ModalLabel>{"Vault Balance"}</ModalLabel>
        <ModalField>
          <Tokens value={vaultBalance} />
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Withdraw Amount"}</ModalLabel>
        <Input
          type="currency"
          placeholder="Enter withdraw amount..."
          disabled={form.loading}
          error={form.errors.tokenAmount}
          value={form.values.tokenAmount}
          onChange={(x) => form.setValue("tokenAmount", x)}
        />
        <Div
          gap={8}
          mt={8}
        >
          <Button
            kind="secondary"
            size="xs"
            label="25%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(vaultBalance * 0.25))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="50%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(vaultBalance * 0.5))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="75%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(vaultBalance * 0.75))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="100%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(vaultBalance))
            }
          />
        </Div>
      </ModalSection>
      <Button
        type="submit"
        kind="primary"
        label="Withdraw"
        fx
        loading={form.loading}
      />
    </Form>
  );
};
