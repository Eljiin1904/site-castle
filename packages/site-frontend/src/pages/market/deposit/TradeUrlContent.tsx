import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Vector } from "@client/comps/vector/Vector";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Market } from "#app/services/market";
import { useTradeUrl } from "#app/hooks/market/useTradeUrl";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const TradeUrlContent = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { loading, tempUrl, setTempUrl, handleSave } = useTradeUrl();

  return (
    <Div
      column
      center
      py={16}
    >
      <Img
        type="png"
        path="/graphics/notice-chicken-error"
        width="256px"
      />
      <Heading
        as="h1"
        className="title"
        size={20}
        textAlign="center"
        mt={32}
        mb={16}
      >
        {"Trade URL Required"}
      </Heading>
      <Div
        display="block"
        fontSize={14}
        color="gray"
        textAlign="center"
        px={16}
        mb={24}
      >
        {"Please set your trade URL to use the marketplace."}
      </Div>
      <Div
        column
        fx
        center
        p={small ? 16 : 24}
        gap={small ? 16 : 24}
        bg="gray-7"
        border
        style={{ maxWidth: "600px" }}
      >
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
          kind="primary"
          label="Save"
          disabled={loading}
          onClick={handleSave}
        />
      </Div>
    </Div>
  );
};
