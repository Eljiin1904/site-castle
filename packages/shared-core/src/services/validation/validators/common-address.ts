import { string } from "yup";
import { isAddress } from "ethers";

export const commonAddress = () => {
  return string()
    .required("Ethereum address is required")
    .test("is-valid-eth-address", "Invalid Ethereum address", (value) =>
      value ? isAddress(value) : false,
    );
};
