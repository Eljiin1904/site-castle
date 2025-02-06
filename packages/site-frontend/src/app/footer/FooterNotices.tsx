import { Span } from "@client/comps/span/Span";

export const FooterNotices = () => {
  return (
    <Span
      size={13}
      color="gray"
    >
      {
        "Castle.com is owned and operated by World54 Holdings Limited (Reg. No. 000037901), licensed and regulated by the Government of the Autonomous Island of Anjouan, Union of Comoros, under License No. ALSI-132405038-FI3."
      }
      <br />
      <br />
      {
        "World54 Entertainment Limited (Reg. No. HE456277) is a wholly owned subsidiary and acts as a payment agent on behalf of World54 Holdings Limited."
      }
      <br />
      <br />
      {
        "Castle.com has passed all regulatory compliance and is legally authorized to conduct gaming operations for all games of chance and wagering."
      }
    </Span>
  );
};
