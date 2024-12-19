import { useWeb3Context } from "../context/Web3Context";

const WalletConnector = () => {
  const { account, connectWallet } = useWeb3Context();

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
    </div>
  );
};

export default WalletConnector;
