import { useState } from "react";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { useMount } from "@client/hooks/system/useMount";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Economy } from "#app/services/economy";

export const DepositSwappedModal = ({ onClose }: { onClose: () => void }) => {
  const [url, setUrl] = useState<string>();

  useMount(async () => {
    const res = await Economy.depositSwapped();
    setUrl(res.url);
  });

  return (
    <Modal
      fixedHeight="760px"
      width="md"
      disableBackdrop
    >
      <ModalHeader
        heading="Deposit with Swapped"
        onCloseClick={onClose}
      />
      <Div
        fx
        borderBottom
        px={20}
        py={12}
        column
        gap={8}
      >
        <Span>
          {
            "Your purchase will automatically be converted to Castle.com tokens once your order is confirmed by Swapped."
          }
        </Span>
        <Div>
          <Div>
            <Vector
              as={SvgDollarSign}
              size={16}
            />
            <Span
              family="title"
              weight="bold"
              size={16}
              color="white"
            >
              {"1.00"}
            </Span>
          </Div>
          <Div mx={8}>
            <Span>{"="}</Span>
          </Div>
          <Div>
            <Vector
              as={SvgSiteToken}
              size={16}
              mr={4}
            />
            <Span
              family="title"
              weight="bold"
              size={16}
              color="white"
            >
              {"2.00"}
            </Span>
          </Div>
        </Div>
      </Div>
      {url && (
        <Div
          fx
          overflow="auto"
        >
          <iframe
            allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment; clipboard-read; clipboard-write"
            src={url}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </Div>
      )}
    </Modal>
  );
};
