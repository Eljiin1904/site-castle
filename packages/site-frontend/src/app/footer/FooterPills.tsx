import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";

export const FooterPills = ({ wrap }: { wrap?: boolean }) => {
  return (
    <Div
      flexFlow={wrap ? "row-wrap" : undefined}
      gap={12}
      py={24}
      align="center"
      alignItems="center"
      justifyContent="space-between"
    >
      <Div
        column
        wrap
        fontSize={16}
        color="white"
      >
        ACCEPTED TOKENS
      </Div>
      <Div
        gap={20}
        style={{ flexWrap: "wrap" }}
      >
        <Div
          py={24}
          px={24}
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(61, 57, 54, 1)",
          }}
          align="center"
          gap={4}
        >
          <Img
            path="/graphics/litecoin_logo"
            width="111px"
            height="auto"
            type="png"
          />
        </Div>

        <Div
          py={24}
          px={24}
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(61, 57, 54, 1)",
          }}
          align="center"
          gap={4}
        >
          <Img
            path="/graphics/ethereum_logo"
            width="128px"
            height="auto"
            type="png"
          />
        </Div>

        <Div
          py={24}
          px={24}
          style={{
            backgroundColor: "rgba(61, 57, 54, 1)",
          }}
          flexFlow="row"
          align="center"
          gap={4}
        >
          <Img
            path="/graphics/bitcoin_logo"
            width="98px"
            height="auto"
            type="png"
          />
        </Div>
      </Div>
    </Div>
  );
};
