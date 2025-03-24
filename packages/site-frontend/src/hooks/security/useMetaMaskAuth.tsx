import { useState, useEffect } from "react";
import { useAuthSearch } from "./useAuthState";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { Dialogs } from "@client/services/dialogs";
import { Web3AuthFinalizeModal } from "#app/modals/security/Web3AuthFinalizeModal";

export function useMetaMaskAuth() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [, setSearch] = useAuthSearch();

  useEffect(() => {
    const init = async () => {
      const ethProvider = (await detectEthereumProvider()) as any;
      console.log("ETH Provider: " + ethProvider);
      if (ethProvider) {
        const web3Provider = new ethers.BrowserProvider(ethProvider);
        setProvider(web3Provider);
        const accounts = await web3Provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          const address = accounts[0];
          const signer = await web3Provider.getSigner();
          setSearch("address=" + address + "&signer=" + signer);
        }
      }
    };
    init();
  }, []);

  const connectMetaMask = async () => {
    if (!provider) return alert("MetaMask not found installed on the browser.");

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      const signer = await provider.getSigner();
      setSearch("?address=" + address + "&signer=" + signer);

      Dialogs.open(
        "primary",
        <Web3AuthFinalizeModal
          address={address}
          signer={signer}
          provider="siwe"
          walletProvider="MetaMask"
        />,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return { connectMetaMask };
}
