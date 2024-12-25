export const CONTRACT_ADDRESS = '0xc2Ab12637BcB40A7C2D7efB95906fa360f90661A';
export const FAUCET_ABI = [
    "function drip() public",
    "function withdraw(uint256 amount) public",
    "function withdrawAll() public",
    "function owner() public view returns (address)",
    "function lastDripTime() public view returns (uint256)",
    "function dripAmount() public view returns (uint256)",
    "function dripBalances(address) public view returns (uint256)",
    "function getBalance() public view returns (uint256)"
];