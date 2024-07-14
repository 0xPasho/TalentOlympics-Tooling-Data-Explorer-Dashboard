"use client";

import { ClusterBlockData } from "~/modules/transactions/types";
import HistoricBlockItem from "./historic-block-item";
import HistoricPanelItemShimmer from "./historic-panel-item";
import { abbreviateSolanaWalletAddress } from "~/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { BoxIcon } from "lucide-react";

const LatestBlocksContent = ({
  error,
  loading,
  data,
}: {
  error?: string | null;
  loading: boolean;
  data: ClusterBlockData[];
}) => {
  const router = useRouter();

  const navigateToTransactions = (
    e: React.MouseEvent<HTMLElement>,
    txSignature: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/transactions/${txSignature}`);
  };

  if (error) {
    return (
      <div className="px-2">
        <span className="text-red-500">
          An error ocurred, if this issue persist please contact support!
          Message: <b>{error}</b>
        </span>
      </div>
    );
  }

  if (loading) {
    const emptyElements = new Array(5).fill(0);
    return (
      <div className="flex flex-col gap-6 px-2">
        {emptyElements.map(() => (
          <HistoricPanelItemShimmer />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="px-2">
        <span className="text-gray-500">
          Nothing to show. No data has been retrieved from Solana.
        </span>
      </div>
    );
  }

  return (
    <>
      {data.map((tx, index) => (
        <HistoricBlockItem
          icon={() => <BoxIcon className="text-black dark:text-white" />}
          key={`block-item-${index}`}
          mobileTitlePrefix="Block "
          title={tx.slot.toString()}
          solValue={tx.fee.toString()}
          date={tx.time}
          onClickTitle={(e) => navigateToTransactions(e, tx.txHash)}
          onClickContainer={(e) => navigateToTransactions(e, tx.txHash)}
        >
          <div className="flex flex-1 flex-col">
            <p>
              Fee Recipient{" "}
              <span
                className="text-primary hover:underline"
                onClick={(e) => navigateToTransactions(e, tx.txHash)}
              >
                {abbreviateSolanaWalletAddress(tx.feePayer)}
              </span>
            </p>
            <p className="text-sm text-gray-400">{tx.txQuantity} txns</p>
          </div>
        </HistoricBlockItem>
      ))}
    </>
  );
};

export default LatestBlocksContent;
