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
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Span } from "@client/comps/span/Span";
import { Spinner } from "@client/comps/spinner/Spinner";
import { SvgCheck } from "@client/svgs/common/SvgCheck";
import { SvgCancel } from "@client/svgs/common/SvgCancel";

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
  const {t} = useTranslation(["wallet"]);
  const crypto = cryptos[cryptoIndex];
  const [quote, setQuote] = useState<CryptoQuoteDocument>();
  const [validatingAddress,setVaidatingAddress] = useState(false);

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

  const currentAddress = form.values.address;
  const isValidAddress = currentAddress && !form.errors.address?.key;

  const getQuote = async (amount: number| undefined) => {
    form.setValue("tokenAmount", amount);
    const { quote } = await Cryptos.quoteWithdraw({
      kind: crypto.kind,
      tokenAmount: amount ?? 0,
      destinationAddress: form.values.address ?? ''
    });
    setQuote(quote);
  };

  return (
    <Form
      form={form}
      grow
    >
      <ModalSection>
        <ModalLabel>{t('currency')}</ModalLabel>
        <Dropdown
            type="select"
            size="md"
            fx
            options={cryptos.map((x) => ({
              label: `${x.name} (${x.kind.replace("_", " ")})`,
              icon: Cryptos.getIcon(x.symbol),
            }))}
            value={cryptoIndex}
            onChange={(x, i) => setCryptoIndex(i)}
          />
      </ModalSection>
      
      <ModalSection>
        <ModalLabel>{t('withdrawAddress',{crypto: crypto.kind.replace("_", " ")})}</ModalLabel>
       
        <Div align="center">
          <Input
            type="text"
            placeholder={t('withdrawAddressPlaceholder',{crypto: crypto.kind.replace("_", " ")})}
            error={form.errors.address?.key ? t(form.errors.address.key, {value: form.errors.address.value}) : undefined}
            value={form.values.address}
            onChange={(x) => form.setValue("address", x)}
          />          
          <Div
            position="absolute"
            right={12}
          >
            {validatingAddress ? (
              <Spinner />
            ) : (
              <Vector
                as={isValidAddress ? SvgCheck : SvgCancel}
                color={isValidAddress ? "green" : currentAddress ? "light-red" : "dark-sand"}
                hover="highlight"
                data-tooltip-id="app-tooltip"
                data-tooltip-content={
                  isValidAddress
                    ? t("withdrawAddressValid")
                    : currentAddress
                      ? t("withdrawAddressInvalid")
                      : t("withdrawAddressRequired")
                }
              />
            )}
          </Div>
        </Div>
      </ModalSection>


      <ModalSection>
        <ModalLabel>{t('withdrawAmount')}</ModalLabel>
        <Div fx>
          <Input
            type="currency"
            height={40}
            placeholder={t("withdrawAmount")}
            error={form.errors.tokenAmount?.key ? t(form.errors.tokenAmount.key, {value: form.errors.tokenAmount.value}) : undefined}
            value={form.values.tokenAmount}
            onChange={getQuote}
            flexGrow={1}
            iconLeft={Cryptos.getIcon(cryptos[cryptoIndex].symbol)}
          />
          <Button
            kind="tertiary-grey"
            label={t("common:max")}
            onClick={() =>form.setValue("tokenAmount", tokenBalance)}
            flexGrow={1}
            size="xssso"
          />
        </Div>
      </ModalSection>
  
      <Div
        gap={16}
        grow
        borderTop
        borderColor="brown-4"
        pt={24}
        fx
        column
      >
        <Div fx justifyContent="space-between">
          <ModalLabel>{t("withdrawAmount")}</ModalLabel>
          <ModalLabel gap={8}>
            <Tokens value={form.values.tokenAmount ?? 0} color="dark-sand" fontSize={12} />
            {/* <Span  color="light-sand">{form.values.tokenAmount}</Span> */}
            {quote && <Span  color="light-sand">{`${quote.cryptoAmount} (~$${quote.usdAmount.toFixed(2)})`}</Span>}
          </ModalLabel>
        </Div>
        <Div fx justifyContent="space-between">
        <ModalLabel>{t("fee")}</ModalLabel>
          <ModalLabel gap={8}>
            <Tokens value={form.values.tokenAmount ?? 0} color="dark-sand" fontSize={12} />
            {quote && <Span  color="light-sand">{`${quote.feeAmount} (~$${quote.feeAmount.toFixed(2)})`}</Span>}
          </ModalLabel>
        </Div>
        <Div fx justifyContent="space-between">
        <ModalLabel>{t("total")}</ModalLabel>
          <ModalLabel gap={8}>
            <Tokens value={form.values.tokenAmount ?? 0} color="dark-sand" fontSize={12} />
            {quote && <Span color="light-sand">{`~${Numbers.round(quote.cryptoAmount - quote.feeAmount, crypto.decimals)} (~$${(quote.usdAmount - quote.feeUsdAmount).toFixed(2)})`}</Span>}
          </ModalLabel>
        </Div>        
        <Button
            kind="primary-yellow"
            type="submit"
            label={t("actionWithdraw")}
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
