import { Web3Provider } from './context/Web3Context';
import WalletConnector from './components/WalletConnector';
import Faucet from './components/Faucet';

const App = () => {
    return (
        <Web3Provider>
            <div>
                <h1>Token Faucet</h1>
                <WalletConnector />
                <Faucet />
            </div>
        </Web3Provider>
    );
};

export default App;