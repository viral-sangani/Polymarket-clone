import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useData } from "../contexts/DataContext";

function Navbar() {
  const router = useRouter();
  const { account, loadWeb3 } = useData();

  return (
    <>
      <nav className="w-full h-16 mt-auto max-w-5xl">
        <div className="flex flex-row justify-between items-center h-full">
          <Link href="/" passHref>
            <span className="font-semibold text-xl cursor-pointer">
              Polymarket
            </span>
          </Link>
          {!router.asPath.includes("/market") &&
            !router.asPath.includes("/admin") && (
              <div className="flex flex-row items-center justify-center h-full">
                <TabButton
                  title="Market"
                  isActive={router.asPath === "/"}
                  url={"/"}
                />
                <TabButton
                  title="Portfolio"
                  isActive={router.asPath === "/portfolio"}
                  url={"/portfolio"}
                />
              </div>
            )}
          {account ? (
            <div className="bg-green-500 px-6 py-2 rounded-md cursor-pointer">
              <span className="text-lg text-white">
                {account.substr(0, 10)}...
              </span>
            </div>
          ) : (
            <div
              className="bg-green-500 px-6 py-2 rounded-md cursor-pointer"
              onClick={() => {
                loadWeb3();
              }}
            >
              <span className="text-lg text-white">Connect</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

const TabButton = ({
  title,
  isActive,
  url,
}: {
  title: string;
  isActive: boolean;
  url: string;
}) => {
  return (
    <Link href={url} passHref>
      <div
        className={`h-full px-4 flex items-center border-b-2 font-semibold hover:border-blue-700 hover:text-blue-700 cursor-pointer ${
          isActive
            ? "border-blue-700 text-blue-700 text-lg font-semibold"
            : "border-white text-gray-400 text-lg"
        }`}
      >
        <span>{title}</span>
      </div>
    </Link>
  );
};
