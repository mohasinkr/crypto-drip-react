import { ethers } from "hardhat";

async function main() {
    console.log("Deploying contract to Sepolia...");

    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    const deployedAddress = await faucet.getAddress();
    console.log(`Faucet contract deployed to: ${deployedAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
