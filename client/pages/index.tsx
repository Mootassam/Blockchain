import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";

const style = {
  wrapper: `h-screen max-h-scrren h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
    <Main />
      <h2>Transaction History</h2>
    </div>
  );
}
