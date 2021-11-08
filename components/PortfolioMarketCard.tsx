import Img from "next/image";
import React from "react";

export const PortfolioMarketCard = () => {
  return (
    <div className="w-full overflow-hidden my-2">
      <div className="flex flex-col border border-gray-300 rounded-lg p-5 hover:border-blue-700 cursor-pointer">
        <div className="flex flex-row space-x-5 pb-4">
          <div className="h-w-15">
            <Img
              src={`https://ipfs.infura.io/ipfs/a`}
              className="rounded-full"
              width={55}
              height={55}
            />
          </div>
          <span className="text-lg font-semibold">
            Will the floor price of CryptoPunks be above 100 ETH on November 1?
          </span>
        </div>
        <div className="flex flex-row flex-nowrap justify-between items-center">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500 font-light">Outcome</span>
            <span className="text-base">No</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">
              Amount Added
            </span>
            <span className="text-base">2,500</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">P/L: $|% </span>
            <span className="text-base">-0.03 | 0.01%</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">Ending In</span>
            <span className="text-base">12 Days</span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <div className="py-2 px-8 rounded-lg bg-blue-700 text-white">
              Trade
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
