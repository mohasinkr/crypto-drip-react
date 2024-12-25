import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3Context } from "../context/Web3Context";
import { FAUCET_ABI, CONTRACT_ADDRESS } from "../constants";

const Faucet = () => {
  const { signer, account } = useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestTokens = async () => {
    if (!signer) return;
    setLoading(true);
    setError("");

    try {
      const faucet = new ethers.Contract(CONTRACT_ADDRESS, FAUCET_ABI, signer);
      const tx = await faucet.drip();
      await tx.wait();
      alert("Tokens received!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFaucetBalance = async () => {
    if (!signer) return;
    setLoading(true);
    setError("");

    try {
      const faucet = new ethers.Contract(CONTRACT_ADDRESS, FAUCET_ABI, signer);
      const balance = await faucet.getBalance();
      alert(`Faucet balance: ${ethers.formatEther(balance)} ETH`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={requestTokens} disabled={!account || loading}>
        {loading ? "Requesting..." : "Request Tokens"}
      </button>
      <button onClick={getFaucetBalance} disabled={!account || loading}>
        {loading ? "Fetching..." : "Get Faucet Balance"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Faucet;
