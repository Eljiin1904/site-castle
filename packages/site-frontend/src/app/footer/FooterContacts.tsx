import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";

export const FooterContacts = () => {
  return (
    <Fragment>
      <Div gap={4}>
        <Span size={13}>{"Support:"}</Span>
        <Span
          size={13}
          weight="semi-bold"
          color="light-gray"
        >
          {"support@chicken.gg"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span size={13}>{"Partners:"}</Span>
        <Span
          size={13}
          weight="semi-bold"
          color="light-gray"
        >
          {"partners@chicken.gg"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span size={13}>{"Legal:"}</Span>
        <Span
          size={13}
          weight="semi-bold"
          color="light-gray"
        >
          {"legal@chicken.gg"}
        </Span>
      </Div>
    </Fragment>
  );
};
