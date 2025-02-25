import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";

export const FooterContacts = () => {
  return (
    <Fragment>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
          {"Support:"}
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"support@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
          {"Partners:"}
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"partners@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
          {"Press:"}
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"press@sandcasino.com"}
        </Span>
      </Div>
    </Fragment>
  );
};
