import { useRef } from "react";
import { useMount } from "@client/hooks/system/useMount";
import "./FooterLicense.scss";

export const FooterLicense = () => {
  const ref = useRef<HTMLDivElement>(null);

  useMount(() => {
    if ("anj_051d3aad_297f_494d_a94c_b3f489eac058" in window) {
      const anj = window.anj_051d3aad_297f_494d_a94c_b3f489eac058 as any;
      anj.init();
    }
  });

  return (
    <div
      ref={ref}
      id="anj-051d3aad-297f-494d-a94c-b3f489eac058"
      data-anj-seal-id="051d3aad-297f-494d-a94c-b3f489eac058"
      data-anj-image-size="128"
      data-anj-image-type="basic-small"
    />
  );
};
