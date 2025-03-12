import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { Numbers } from "@core/services/numbers";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalField } from "@client/comps/modal/ModalField";
import { Div } from "@client/comps/div/Div";
import { Spinner } from "@client/comps/spinner/Spinner";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalError } from "@client/comps/modal/ModalError";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Link } from "@client/comps/link/Link";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Transactions } from "#app/services/transactions";
import { Users } from "#app/services/users";
import { Cryptos } from "#app/services/cryptos";

// TODO: Separate this monster into components
export const TransactionBody = ({
  transaction: tx,
  error,
}: {
  transaction?: TransactionDocument;
  error: Error | null;
}) => {
  if (error) {
    return <ModalError error={error} />;
  }
  if (!tx) {
    return (
      <Div
        center
        py={64}
      >
        <Spinner size={64} />
      </Div>
    );
  }
  return (
    <ModalBody>
      {tx.kind === "withdraw-crypto" && tx.user.tags.includes("cheeky") && (
        <NoticeCard
          kind="warning"
          message="This withdraw is for a Cheeky user."
        />
      )}
      <Div
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Transaction ID"}</ModalLabel>
          <ModalField>{tx._id}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Type"}</ModalLabel>
          <ModalField>{Transactions.getName(tx)}</ModalField>
        </ModalSection>
        {"gameId" in tx && (
          <ModalSection>
            <ModalLabel>{"Game ID"}</ModalLabel>
            <ModalField>{tx.gameId}</ModalField>
          </ModalSection>
        )}
      </Div>
      <Div
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Created"}</ModalLabel>
          <ModalField>{Dates.toFullDateString(tx.timestamp)}</ModalField>
        </ModalSection>
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
      <Div
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"User ID"}</ModalLabel>
          <ModalField>{tx.user.id}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Username"}</ModalLabel>
          <ModalField>{tx.user.name}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"User Level"}</ModalLabel>
          <ModalField>{Users.getLevel(tx.user.xp)}</ModalField>
        </ModalSection>
      </Div>
      <Div
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Token Amount"}</ModalLabel>
          <ModalField>
            <Tokens
              value={tx.amount}
              accent={tx.amount > 0 ? "positive" : "negative"}
            />
          </ModalField>
        </ModalSection>
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
      {"cryptoAmount" in tx && (
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Crypto Amount"}</ModalLabel>
            <ModalField>
              {`${Numbers.round(tx.cryptoAmount, 8)} ${tx.cryptoKind.replace("_", " ")}`}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"USD Amount"}</ModalLabel>
            <ModalField>{Numbers.toUsdString(tx.usdAmount)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Fee Amount"}</ModalLabel>
            <ModalField>{Numbers.toUsdString(tx.feeUsdAmount)}</ModalField>
          </ModalSection>
        </Div>
      )}
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
            >
              {tx.txHash}
            </Link>
          </ModalField>
        </ModalSection>
      )}
      {"location" in tx && (
        <ModalSection>
          <ModalLabel>{"Location"}</ModalLabel>
          <ModalField>{Users.getLocationString(tx.location)}</ModalField>
        </ModalSection>
      )}
      {(tx.kind === "deposit-skin" || tx.kind === "withdraw-skin") && (
        <Div
          fx
          gap={16}
        >
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
        </Div>
      )}
      {"approvedBy" in tx && (
        <ModalSection>
          <ModalLabel>{"Approved By"}</ModalLabel>
          <ModalField>
            {tx.approvedBy === "auto" ? "Auto Approved" : tx.approvedBy!.name}
          </ModalField>
        </ModalSection>
      )}
    </ModalBody>
  );
};
