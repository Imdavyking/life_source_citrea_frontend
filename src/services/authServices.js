/** @format */
import abi from "@/assets/json/abi.json";
import { ethers } from "ethers";

async function switchOrAddCitrea(ethProvider) {
  try {
    const chainId = await ethProvider.provider.request({
      method: "eth_chainId",
    });
    const citreaChainId = "0x13fb"; // 5115
    // Check if the current chain is Citrea Testnet
    if (chainId !== citreaChainId) {
      // Try to switch to Citrea Testnet
      await ethProvider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: citreaChainId }], // Citrea Testnet Chain ID
      });
      console.log("Switched to Citrea Testnet");

      if (error.code === 4902) {
        const infuraApiKey = "53163c736f1d4ba78f0a39ffda8d87b4";

        // If the chain is not added to the wallet, add it

        await ethProvider.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: citreaChainId,
              chainName: "Citrea Testnet",
              nativeCurrency: {
                name: "Citrea Ether",
                symbol: "cBTC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.testnet.citrea.xyz"], // Replace with your RPC URL
              blockExplorerUrls: ["https://explorer.testnet.citrea.xyz"],
            },
          ],
        });
        console.log("Citrea Testnet added and switched");
      } else {
        console.error("Failed to switch to Citrea Testnet:", error);
      }
    } else {
      console.log("Already connected to Citrea Testnet");
    }
  } catch (error) {}
}

const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider.getSigner();
};

const getContract = async () => {
  if (!window.ethereum) {
    toast.info(
      "MetaMask is not installed. Please install it to use this feature."
    );
    return;
  }
  const signer = getSigner();
  // ensure chain is Citrea
  await switchOrAddCitrea(signer.provider);
  return new ethers.Contract(
    "0x7b8DAfb189b8274FA34AE9965fB9e496Bdd609ED",
    abi,
    signer
  );
};

export const addPointService = async (weight) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.addPointFromWeight(Math.trunc(weight));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getPointsService = async () => {
  try {
    const signer = getSigner();
    const lifeSourceManager = await getContract();

    const userAddress = await signer.getAddress();

    const points = await lifeSourceManager.userPoints(userAddress);
    return Number(points[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const redeemCodeService = async (point) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.redeemCode(Math.trunc(point));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
