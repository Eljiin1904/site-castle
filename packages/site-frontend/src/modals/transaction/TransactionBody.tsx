import { Fragment } from "react";
import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { Numbers } from "@core/services/numbers";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Transactions } from "@client/services/transactions";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Cryptos } from "#app/services/cryptos";

// TODO: Separate this monster into components
export const TransactionBody = ({
  transaction: tx,
}: {
  transaction: TransactionDocument;
}) => {
  return (
    <ModalBody>
      <ModalSection>
        <ModalLabel>{"Transaction"}</ModalLabel>
        <ModalField>{Transactions.getName(tx)}</ModalField>
      </ModalSection>
      <Div
        fx
        gap={12}
      >
        <ModalSection>
          <ModalLabel>{"Transaction ID"}</ModalLabel>
          <ModalField>{tx._id}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Timestamp"}</ModalLabel>
          <ModalField>{Dates.toFullDateString(tx.timestamp)}</ModalField>
        </ModalSection>
      </Div>
      <Div
        fx
        gap={12}
      >
        <ModalSection>
          <ModalLabel>{"Status"}</ModalLabel>
          <ModalField color={Transactions.getStatusColor(tx.status)}>
            {Strings.kebabToTitle(tx.status)}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Updated"}</ModalLabel>
          <ModalField>{Dates.toFullDateString(tx.statusDate)}</ModalField>
        </ModalSection>
      </Div>
      <ModalSection>
        <ModalLabel>{"Amount"}</ModalLabel>
        <ModalField>
          <Tokens
            value={tx.amount}
            accent={tx.amount > 0 ? "positive" : "negative"}
          />
        </ModalField>
      </ModalSection>
      <Div
        fx
        gap={12}
      >
        <ModalSection>
          <ModalLabel>{"Balance Before"}</ModalLabel>
          <ModalField>
            <Tokens value={tx.balance} />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Balance After"}</ModalLabel>
          <ModalField>
            <Tokens value={tx.balance + tx.amount} />
          </ModalField>
        </ModalSection>
      </Div>
      {tx.kind === "tip-receive" && (
        <ModalSection>
          <ModalLabel>{"Sent By"}</ModalLabel>
          <ModalField>{tx.sender.name}</ModalField>
        </ModalSection>
      )}
      {tx.kind === "tip-send" && (
        <ModalSection>
          <ModalLabel>{"Sent To"}</ModalLabel>
          <ModalField>{tx.receiver.name}</ModalField>
        </ModalSection>
      )}
      {"txHash" in tx && (
        <ModalSection>
          <ModalLabel>{"Tx Hash"}</ModalLabel>
          <ModalField>
            <Link
              type="a"
              href={`${Cryptos.getInfo(tx.cryptoKind).explorerUrl}${tx.txHash}`}
              textOverflow="ellipsis"
            >
              {tx.txHash}
            </Link>
          </ModalField>
        </ModalSection>
      )}
      {tx.kind === "withdraw-crypto" && (
        <Fragment>
          <ModalSection>
            <ModalLabel>{"Crypto Amount"}</ModalLabel>
            <ModalField>
              {`${Numbers.round(tx.cryptoAmount, 8)} ${tx.cryptoKind.replace("_", " ")}`}
            </ModalField>
          </ModalSection>
          <Div
            fx
            gap={12}
          >
            <ModalSection>
              <ModalLabel>{"USD Amount"}</ModalLabel>
              <ModalField>{Numbers.toUsdString(tx.usdAmount)}</ModalField>
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"USD Rate"}</ModalLabel>
              <ModalField>{Numbers.toUsdString(tx.usdRate)}</ModalField>
            </ModalSection>
          </Div>
          <Div
            fx
            gap={12}
          >
            <ModalSection>
              <ModalLabel>{"Fee Amount"}</ModalLabel>
              <ModalField>
                {`${Numbers.round(tx.feeAmount, 8)} ${tx.cryptoKind.replace("_", " ")}`}
              </ModalField>
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Fee USD Amount"}</ModalLabel>
              <ModalField>{Numbers.toUsdString(tx.feeUsdAmount)}</ModalField>
            </ModalSection>
          </Div>
          <Div
            fx
            gap={12}
          >
            <ModalSection>
              <ModalLabel>{"Net Amount"}</ModalLabel>
              <ModalField>
                {`${Numbers.round(tx.cryptoAmount - tx.feeAmount, 8)} ${tx.cryptoKind.replace("_", " ")}`}
              </ModalField>
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Net USD Amount"}</ModalLabel>
              <ModalField>
                {Numbers.toUsdString(tx.usdAmount - tx.feeUsdAmount)}
              </ModalField>
            </ModalSection>
          </Div>
        </Fragment>
      )}
      {(tx.kind === "case-battle-join" || tx.kind === "case-battle-won") && (
        <Link
          type="router"
          to={`/case-battles/${tx.gameId}`}
          hover="none"
          fx
        >
          <Button
            kind="secondary"
            label="View Battle"
            fx
            onClick={() => Dialogs.close("primary")}
          />
        </Link>
      )}
      {"gameId" in tx && (
        <Link
          type="router"
          to={`/fairness/${tx.category}`}
          hover="none"
          fx
        >
          <Button
            kind="secondary"
            label="View Fairness"
            fx
            onClick={() => Dialogs.close("primary")}
          />
        </Link>
      )}
      {(tx.kind === "deposit-skin" || tx.kind === "withdraw-skin") && (
        <Fragment>
          <ModalSection>
            <ModalLabel>{"Skin"}</ModalLabel>
            <ModalField textOverflow="ellipsis">
              {tx.item?.marketHashName || "N/A"}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Trade Offer ID"}</ModalLabel>
            <ModalCopyField text={tx.tradeOfferId || "N/A"} />
          </ModalSection>
          {["pending", "processing"].includes(tx.status) && (
            <Div
              fx
              column
              gap={12}
            >
              <Link
                fx
                type="a"
                href={`https://steamcommunity.com/tradeoffer/${tx.tradeOfferId}`}
              >
                <Button
                  fx
                  kind="primary"
                  label="Confirm in Browser"
                  iconRight={SvgExternal}
                />
              </Link>
              <Link
                fx
                type="a"
                href={`steam://openurl/https://steamcommunity.com/tradeoffer/${tx.tradeOfferId}`}
              >
                <Button
                  fx
                  kind="secondary"
                  label="Confirm in Client"
                  iconRight={SvgExternal}
                />
              </Link>
            </Div>
          )}
        </Fragment>
      )}
    </ModalBody>
  );
};
