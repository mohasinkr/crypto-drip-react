import { createContext, useState, ReactNode, useContext } from "react";
import { ethers } from "ethers";

// Define types for our context
interface Web3ContextProps {
  account: string;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  connectWallet: () => Promise<void>;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Context = createContext<Web3ContextProps | null>(null);

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;

  const connectWallet = async (): Promise<void> => {
    try {
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = (await ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        console.log("Connected to wallet:", accounts[0]);
        const signer = await provider.getSigner();

        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <Web3Context.Provider value={{ account, provider, signer, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

// Create context with default values
export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
