import React, { useState, useContext,useEffect } from "react";
import ethlog from "../assets/ethe.png";
import uniswap from "../assets/uniswap.png";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { TransactionContext } from "@/context/TransactionContext";
import { log } from "console";
const style = {
  wrapper: "p-4 w-screen flex justify-between items-center  ",
  headerLogo: "flex w-1/4 items-center justify-start",
  nav: "flex-1 flex justify-center items-center",
  navItemsContainer: `flex bg-[#191b1F] rounded-3xl`,
  navItem:
    "px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl ",
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  buttons: "flex items-center bg-[#191B1F] rounded-2xl mx-2",
  buttonPadding: "p-2",
  buttonTextContainer: "h-8 flex items-center",
  buttonIconContainer: "flex items-center justify-center w-8",
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
};

function Header() {
  const  [userName , setUserName] = useState("")
  const { connectWallet, currentAccount } = useContext(TransactionContext);

    useEffect(() => {
      if(!currentAccount) return
      setUserName(`${currentAccount?.slice(0, 7)} ... ${currentAccount?.slice(35)}`)
    }, [currentAccount])
    

  const [selectNav, setSelectedNav] = useState("swap");
  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        <Image src={uniswap} alt="UniswapLogo" height={40} width={40} />
      </div>

      <div className={style.nav}>
        <div className={style.navItemsContainer}>
          <div
            onClick={() => setSelectedNav("swap")}
            className={`${style.navItem} ${
              selectNav === "swap" && style.activeNavItem
            }`}
          >
            Swap
          </div>

          <div
            onClick={() => setSelectedNav("pool")}
            className={`${style.navItem} ${
              selectNav === "swap" && style.activeNavItem
            }`}
          >
            Pool
          </div>

          <div
            onClick={() => setSelectedNav("vote")}
            className={`${style.navItem} ${
              selectNav === "swap" && style.activeNavItem
            }`}
          >
            Vote
          </div>

          <a
            href="https://info.uniswap.org/#/"
            target="_blanck"
            rel="noreferrer"
          >
            <div className={style.navItem}>
              Charts <FiArrowUpRight />
            </div>
          </a>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.buttons} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={ethlog} alt="eth" height={20} width={20} />
          </div>
          <p>Ethereum</p>
          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div className={`${style.buttons} ${style.buttonPadding}`}>

            <div className={`${style.buttonTextContainer}`}>{userName}</div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.buttons} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect wallet
            </div>
          </div>
        )}

        <div className={`${style.buttons} ${style.buttonPadding}`}>
          <div className={`${style.buttonIconContainer} mx-2`}>
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
