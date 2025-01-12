/** @format */

import React, { useEffect } from "react";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { Link } from "react-router-dom";
import Footer from "@/base-components/footer";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.png";
import illustrationUrl from "@/assets/images/illustration.svg";
import citreaLogo from "@/assets/images/citrea.svg";
import { useWallet } from "@/App";
import { ethers } from "ethers";
import { getFirstAndLast4Chars } from "../../App";

const Home = () => {
  const { walletAddress, setWalletAddress } = useWallet();
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert(
          "MetaMask is not installed. Please install it to use this feature."
        );
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div>
          <div className="flex justify-between items-center w-full">
            <a href="" className="-intro-x flex items-center pt-5">
              <img alt="LifeSource" className="w-6" src={logoUrl} />
              <span className="text-white text-lg ml-3"> LifeSource </span>
            </a>
            <div>
              <button
                onClick={connectWallet}
                className="btn  btn-outline-secondary bg-white py-3 text-primary px-4 w-48 mt-3 xl:mt-0 align-top mr-3"
                style={{ color: "black" }}
              >
                {getFirstAndLast4Chars(walletAddress) ?? "Connect Wallet"}
                {/* Connect Wallet */}
              </button>

              <Link to="/add-points">
                <button
                  className="btn btn-outline-secondary bg-white py-3 text-primary px-4 w-48 mt-3 xl:mt-0 align-top mr-3 "
                  style={{ color: "black" }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full my-24">
            <h2 className="-intro-x text-white font-extrabold text-5xl my-2">
              LIFESOURCE
            </h2>
            <p className="-intro-x text-white font-extrabold text-3xl my-2 text-center w-[50%]">
              This is a solution that rewards users with token for recycling and
              use them to uphold the SDG goals
              <span className="text-[#c54dfc] px-2">blockchain-powered</span>
              recycling solution....
            </p>
            <Link to="/redeem-points">
              <button
                className="btn btn-outline-secondary bg-white py-3 text-primary px-4 w-64 mt-3 xl:mt-0 align-top"
                style={{ color: "black" }}
              >
                Redeem Points
              </button>
            </Link>
          </div>

          <div className="bg-white w-full px-7 rounded-sm h-48">
            <h2 className="-intro-x text-black font-extrabold text-2xl my-2">
              SPONSORS
            </h2>
            <div className="flex items-center gap-3">
              <img alt="LifeSource" className="w-40" src={citreaLogo} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
