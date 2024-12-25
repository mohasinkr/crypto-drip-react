import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ALCHEMY_API_KEY || !process.env.ACCOUNT_PRIVATE_KEY) {
  throw new Error("Missing ALCHEMY_API_KEY or PRIVATE_KEY in .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  paths:{
    sources: "./src/contracts",
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
  // etherscan: {
  //   // Optional: For verifying contracts on Etherscan (supports Sepolia)
  //   apiKey: process.env.ETHERSCAN_API_KEY || "",
  // },
};

export default config;
