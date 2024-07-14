import { useEffect } from "react";
import useGlobalStore from "~/modules/global/store/store";

const useTrackSolanaPricing = () => {
  const { setSolanaStatus } = useGlobalStore();

  const fireSolanaTracking = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending",
      );
      const data = await response.json();
      const solano = data.coins.find(({ item }) => item.slug === "solana");
      setSolanaStatus({
        ...solano.item.data,
        price_change_percentage_24h:
          solano.item.data.price_change_percentage_24h.usd,
      });
      // const price = data.solana.usd;
      // console.log(`The current price of Solana is $${price}`);
    } catch (error) {
      console.error("Error fetching the Solana price:", error);
    }
  };

  useEffect(() => {
    fireSolanaTracking();
  }, []);
};

export default useTrackSolanaPricing;
