import create from "zustand";

interface TransactionInfo {
  market_cap: string;
  market_cap_btc: string;
  price: number;
  price_btc: string;
  price_change_percentage_24h: string;
  total_volume: string;
  total_volume_btc: string;
}

type GlobalState = {
  solanaStatus: TransactionInfo | null;
};

const initialState: GlobalState = {
  solanaStatus: null,
};

const useGlobalStore = create<
  GlobalState & {
    setSolanaStatus: (solanaStatus: TransactionInfo) => void;
  }
>((set) => ({
  ...initialState,
  setSolanaStatus: (solanaStatus: TransactionInfo) => {
    set({ solanaStatus });
  },
}));

export default useGlobalStore;
