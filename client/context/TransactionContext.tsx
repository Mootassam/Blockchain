import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/constants';

declare global {
  interface Window {
    ethereum: any; // or specify the exact type if you know it
  }
}

export interface TransactionContextType {
  currentAccount: any | null;
  connectWallet: (metamask?: any) => void;
  sendTransaction: (metamask?: any) => void;
  handleChange: (e: any, name: string) => void;
  FormData: any
}

export const initialTransactionState: TransactionContextType = {
  currentAccount: null,
  connectWallet: () => {},
  sendTransaction: () => {},
  handleChange: () => {},
  FormData :{}
};

export const TransactionContext = React.createContext(initialTransactionState);
let eth;
if (typeof window !== "undefined") {
  eth = (window as any).ethereum;
}

const getEthereumContract = () => {
  const ethereum = (window as any).ethereum; // Make sure 'ethereum' is properly available
  if (!ethereum) {
    throw new Error("Ethereum provider not found. Make sure you have MetaMask or a compatible wallet installed.");
  }

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
  );

  return transactionContract;

}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [FormData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });

  console.log(FormData)

  useEffect(() => {
    checkIfWalletISConnected();
  }, []);

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Wallet is already connected!");
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    }
  };

  const checkIfWalletISConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return alert("Please install metamask");
      const { addressTo, amount } = FormData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.encodeBytes32String(amount);
      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x7EF40",
            value: parsedAmount,
          },
        ],
      });

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        "TRANSFER"
      );
      setIsLoading(true);
      await transactionHash.wait();

      // await saveTransaction(
      //   transactionHash.hash,
      //   amount,
      //   connectedAccount,
      //   addressTo
      // )
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <TransactionContext.Provider
      value={{ currentAccount, connectWallet, sendTransaction, handleChange ,FormData}}
    >
      {children}
    </TransactionContext.Provider>
  );
};
