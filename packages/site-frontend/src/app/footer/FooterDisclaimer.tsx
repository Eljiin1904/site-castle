import { Span } from "@client/comps/span/Span";

export const FooterDisclaimer = () => {
  return (
    <Span
      size={13}
      color="gray"
    >
      {
        "Castle.com is not affiliated, endorsed by, or in any way associated with Counter-Strike, Valve LLC, Steam or any of its subsidiaries or its affiliates."
      }
    </Span>
  );
};
