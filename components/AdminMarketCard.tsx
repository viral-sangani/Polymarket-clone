import Img from "next/image";
import React from "react";

interface Props {
  openModal: () => void;
}

export const AdminMarketCard: React.FC<Props> = ({ openModal }) => {
  return (
    <div className="w-full overflow-hidden my-2">
      <div className="flex flex-col border border-gray-300 rounded-lg p-5 hover:border-blue-700 cursor-pointer">
        <div className="flex flex-row space-x-5 pb-4">
          <div className="h-w-15">
            <Img
              src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/isjFotcMs.PA/v1/1000x-1.jpg"
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
            <span className="text-xs text-gray-500 font-light">
              Total Liquidity
            </span>
            <span className="text-base">2,500</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">Ending In</span>
            <span className="text-base">12 Days</span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <button
              className="py-2 px-8 rounded-lg bg-blue-700 text-white"
              onClick={() => {
                openModal();
              }}
            >
              Resolve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
