"use client";

import { currencyFormatter } from "~/lib/utils";
import useGlobalStore from "~/modules/global/store/store";
import { SolanaIcon } from "~/modules/home/components/grid-details/grid-details-content";
import useTrackSolanaPricing from "~/modules/solana/hooks/useTrackSolanaPricing";

const AppBanner = () => {
  const { solanaStatus } = useGlobalStore();
  useTrackSolanaPricing();

  return (
    <div className="align-center container:px-0 mx-auto flex flex h-12  h-14 w-full max-w-container flex-row items-center items-center px-4 lg:px-6">
      <div className="flex flex-row gap-1">
        <SolanaIcon className="w-3" />
        <span className="text-xs">
          Solana Price: {currencyFormatter.format(solanaStatus?.price || 0)}
        </span>
      </div>
    </div>
  );
};

export default AppBanner;
