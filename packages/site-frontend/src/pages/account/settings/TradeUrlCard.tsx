import { Heading } from "@client/comps/heading/Heading";
import { CardSection } from "@client/comps/cards/CardSection";
import { Card } from "@client/comps/cards/Card";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Span } from "@client/comps/span/Span";
import { Market } from "#app/services/market";
import { useTradeUrl } from "#app/hooks/market/useTradeUrl";

export const TradeUrlCard = () => {
  const { loading, tempUrl, setTempUrl, handleSave } = useTradeUrl();

  return (
    <Card column>
      <CardSection
        position="header"
        py={16}
        justify="space-between"
      >
        <Heading>{"Steam Trade URL"}</Heading>
        <Div>
          <Link
            type="a"
            href={Market.tradeUrlLookup}
            gap={4}
            alignItems="center"
          >
            <Span
              size={13}
              color="light-blue"
            >
              {"Find it here"}
            </Span>
            <Vector
              size={14}
              color="light-blue"
              as={SvgExternal}
            />
          </Link>
        </Div>
      </CardSection>
      <CardSection>
        <Input
          type="text"
          placeholder="Enter trade url..."
          value={tempUrl}
          onChange={setTempUrl}
        />
        <Button
          kind="primary"
          label="Save"
          disabled={loading}
          onClick={handleSave}
        />
      </CardSection>
    </Card>
  );
};
