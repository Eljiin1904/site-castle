import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Input } from "@client/comps/input/Input";
import { Link } from "@client/comps/link/Link";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Market } from "#app/services/market";
import { useTradeUrl } from "#app/hooks/market/useTradeUrl";

export const TradeUrlContent = () => {
  const { loading, tempUrl, setTempUrl, handleSave } = useTradeUrl();

  return (
    <Div
      column
      fx
      center
    >
      <Img
        type="png"
        path="/graphics/notice-chicken-error"
        width="200px"
      />
      <Heading
        as="h1"
        size={20}
        mt={32}
      >
        {"Trade URL Required"}
      </Heading>
      <Span
        mt={16}
        mb={32}
      >
        {"Please set your trade URL to use the marketplace."}
      </Span>
      <ModalSection>
        <ModalLabel justifyContent="space-between">
          {"Trade URL"}
          <Link
            type="a"
            href={Market.tradeUrlLookup}
            alignItems="center"
            gap={4}
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
        </ModalLabel>
        <Input
          type="text"
          placeholder="Enter trade url..."
          value={tempUrl}
          onChange={setTempUrl}
        />
      </ModalSection>
      <Button
        fx
        mt={24}
        kind="primary"
        label="Save"
        disabled={loading}
        onClick={handleSave}
      />
    </Div>
  );
};
