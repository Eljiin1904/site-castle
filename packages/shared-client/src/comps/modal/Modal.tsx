import { ElementRef, FC, Ref } from "react";
import classNames from "classnames";
import { Div } from "../div/Div";
import "./Modal.scss";

export type ModalProps = {
  id?: string;
  className?: string;
  children: any;
  forwardRef?: Ref<ElementRef<"div">>;
  width?: "sm" | "md" | "lg" | "xl" | "xxl";
  fixedHeight?: string;
  disableBackdrop?: boolean;
  onBackdropClick?: () => void;
  disableMobileFullscreen?: boolean;
};

export const Modal: FC<ModalProps> = ({
  id,
  className,
  children,
  forwardRef,
  width = "md",
  fixedHeight,
  disableBackdrop,
  onBackdropClick,
  disableMobileFullscreen,
}) => {
  return (
    <Div
      id={id}
      forwardRef={forwardRef}
      className={classNames("Modal", className, {
        [`width-${width}`]: width,
        "mobile-fs": !disableMobileFullscreen,
      })}
    >
      <Div
        className="modal-backdrop"
        position="absolute"
        fx
        fy
        onClick={disableBackdrop ? undefined : onBackdropClick}
      />
      <Div
        className="modal-outer"
        fx
        fy
        center
        p={16}
      >
        <Div
          className="modal-inner"
          fx
          column
          bg="brown-7"
          border
          style={fixedHeight ? { height: fixedHeight } : undefined}
        >
          {children}
        </Div>
      </Div>
    </Div>
  );
};
