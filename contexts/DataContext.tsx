declare let window: any;
import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import Polymarket from "../abis/Polymarket.json";
import PolyToken from "../abis/PolyToken.json";

interface DataContextProps {
  account: string;
  loading: boolean;
  loadWeb3: () => Promise<void>;
  polymarket: any;
  polyToken: any;
}

const DataContext = createContext<DataContextProps>({
  account: "",
  loading: true,
  loadWeb3: async () => {},
  polymarket: null,
  polyToken: null,
});

export const DataProvider: React.FC = ({ children }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps>(DataContext);

export const useProviderData = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [polymarket, setPolymarket] = useState<any>();
  const [polyToken, setPolyToken] = useState<any>();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Eth browser detected. Please consider using MetaMask.");
      return;
    }
    var allAccounts = await window.web3.eth.getAccounts();
    setAccount(allAccounts[0]);
    await loadBlockchainData();
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const polymarketData = Polymarket.networks["80001"];
    const polyTokenData = PolyToken.networks["80001"];

    if (polymarketData && polyTokenData) {
      var tempContract = await new web3.eth.Contract(
        Polymarket.abi,
        polymarketData.address
      );
      setPolymarket(tempContract);
      var tempTokenContract = await new web3.eth.Contract(
        PolyToken.abi,
        polyTokenData.address
      );

      setPolyToken(tempTokenContract);
    } else {
      window.alert("TestNet not found");
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    account,
    polymarket,
    polyToken,
    loading,
    loadWeb3,
  };
};
