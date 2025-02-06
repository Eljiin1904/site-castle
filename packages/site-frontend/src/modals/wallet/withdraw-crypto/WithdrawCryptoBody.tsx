import { useState } from "react";
import { CryptoQuoteDocument } from "@core/types/cryptos/CryptoQuoteDocument";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Validation } from "@core/services/validation";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalField } from "@client/comps/modal/ModalField";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSend } from "@client/svgs/common/SvgSend";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Cryptos } from "#app/services/cryptos";
import { waitForAuthenticatorCode } from "#app/modals/security/AuthenticatorCodeModal";
import { WalletAction } from "../WalletAction";

const cryptos = Cryptos.infos.filter((x) => x.canWithdraw);

export const WithdrawCryptoBody = ({
  setAction,
}: {
  setAction: (x: WalletAction) => void;
}) => {
  const [cryptoIndex, setCryptoIndex] = useState(0);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const settings = useAppSelector((x) => x.user.settings);
  const require2fa = tfaEnabled && settings.withdraw2fa;

  const crypto = cryptos[cryptoIndex];

  const form = useForm({
    schema: Validation.object({
      address: Validation.string().required("Address is required."),
      tokenAmount: Validation.currency("Amount"),
    }),
    onSubmit: async (values) => {
      const { quote } = await Cryptos.quoteWithdraw({
        kind: crypto.kind,
        tokenAmount: values.tokenAmount,
        destinationAddress: values.address,
      });

      const confirmed = await waitForConfirmation({
        heading: "Confirm Withdraw",
        message: <ConfirmContent quote={quote} />,
      });

      if (!confirmed) return;

      let tfac: string | undefined;

      if (require2fa) {
        tfac = await waitForAuthenticatorCode();
        if (!tfac) return;
      }

      await Cryptos.createWithdraw({
        quoteId: quote._id,
        tfac,
      });

      Toasts.success("Withdraw pending approval.");

      Dialogs.close("primary");
    },
  });

  return (
    <Form
      form={form}
      grow
    >
      <Dropdown
        type="select"
        fx
        options={cryptos.map((x) => ({
          label: x.name,
          description: x.kind.replace("_", " "),
          icon: Cryptos.getIcon(x.symbol),
        }))}
        value={cryptoIndex}
        onChange={(x, i) => setCryptoIndex(i)}
      />
      <Div gap={8}>
        <ModalSection>
          <ModalLabel>{"Balance"}</ModalLabel>
          <ModalField>
            <Tokens value={tokenBalance} />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Minimum Amount"}</ModalLabel>
          <ModalField>
            <Tokens value={crypto.minWithdrawTokens} />
          </ModalField>
        </ModalSection>
      </Div>
      <ModalSection>
        <ModalLabel>{`Your ${crypto.kind.replace("_", " ")} address`}</ModalLabel>
        <Input
          type="text"
          placeholder={`Enter ${crypto.kind.replace("_", " ")} address`}
          error={form.errors.address}
          value={form.values.address}
          onChange={(x) => form.setValue("address", x)}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Withdraw Amount"}</ModalLabel>
        <Div gap={8}>
          <Input
            type="currency"
            placeholder="Token amount"
            error={form.errors.tokenAmount}
            value={form.values.tokenAmount}
            onChange={(x) => form.setValue("tokenAmount", x)}
          />
          <Input
            type="currency"
            iconLeft={SvgDollarSign}
            placeholder="USD amount"
            error={form.errors.tokenAmount}
            value={
              form.values.tokenAmount ? form.values.tokenAmount / 2 : undefined
            }
            onChange={(x) =>
              form.setValue("tokenAmount", x ? x * 2 : undefined)
            }
          />
        </Div>
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
              form.setValue("tokenAmount", Intimal.floor(tokenBalance * 0.25))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="50%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(tokenBalance * 0.5))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="75%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(tokenBalance * 0.75))
            }
          />
          <Button
            kind="secondary"
            size="xs"
            label="100%"
            labelSize={12}
            fx
            onClick={() =>
              form.setValue("tokenAmount", Intimal.floor(tokenBalance))
            }
          />
        </Div>
      </ModalSection>
      <Div
        gap={8}
        grow
        align="flex-end"
      >
        <Button
          kind="secondary"
          type="submit"
          label="Back to Options"
          fx
          disabled={form.loading}
          onClick={() => setAction("withdraw")}
        />
        <Button
          kind="primary"
          type="submit"
          label="Continue"
          fx
          disabled={
            !form.values.tokenAmount ||
            form.values.tokenAmount < crypto.minWithdrawTokens ||
            form.values.address === undefined ||
            form.loading
          }
        />
      </Div>
    </Form>
  );
};

const ConfirmContent = ({ quote }: { quote: CryptoQuoteDocument }) => {
  const crypto = Cryptos.getInfo(quote.cryptoKind);
  const da = quote.destinationAddress;

  return (
    <Div
      fx
      column
      gap={16}
    >
      <ModalSection>
        <ModalLabel>{"Crypto"}</ModalLabel>
        <ModalField>
          <Vector
            as={Cryptos.getIcon(crypto.symbol)}
            size={18}
            mr={6}
          />
          {`${crypto.name} (${crypto.kind.replace("_", " ")})`}
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Destination Address"}</ModalLabel>
        <ModalField>
          <Vector
            as={SvgSend}
            size={16}
            mr={7}
          />
          {da.substring(0, 8) + "..." + da.substring(da.length - 8, da.length)}
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Token Amount"}</ModalLabel>
        <ModalField>
          <Tokens value={quote.tokenAmount} />
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Withdraw Amount"}</ModalLabel>
        <ModalField>
          <Vector
            as={Cryptos.getIcon(crypto.symbol)}
            size={18}
            mr={6}
          />
          {`${quote.cryptoAmount} (~$${quote.usdAmount.toFixed(2)})`}
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Network Fee"}</ModalLabel>
        <ModalField>
          <Vector
            as={Cryptos.getIcon(crypto.symbol)}
            size={18}
            mr={6}
          />
          {`~${quote.feeAmount} (~$${quote.feeUsdAmount.toFixed(2)})`}
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Net Amount"}</ModalLabel>
        <ModalField>
          <Vector
            as={Cryptos.getIcon(crypto.symbol)}
            size={18}
            mr={6}
          />
          {`~${Numbers.round(quote.cryptoAmount - quote.feeAmount, crypto.decimals)} (~$${(quote.usdAmount - quote.feeUsdAmount).toFixed(2)})`}
        </ModalField>
      </ModalSection>
      <NoticeCard
        kind="warning"
        message="Sends are final and cannot be undone."
      />
    </Div>
  );
};
