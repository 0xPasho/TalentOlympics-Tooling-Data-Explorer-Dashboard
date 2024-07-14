"use client";

import { ClusterTransactionData } from "~/modules/transactions/types";
import HistoricBlockItem from "./historic-block-item";
import HistoricPanelItemShimmer from "./historic-panel-item";
import { abbreviateSolanaWalletAddress } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { FileTextIcon } from "lucide-react";

const LatestTransactionsContent = ({
  error,
  loading,
  data,
}: {
  error?: string | null;
  loading: boolean;
  data: ClusterTransactionData[];
}) => {
  const router = useRouter();
  const navigateToTransaction = (
    e: React.MouseEvent<HTMLElement>,
    txHash: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/transactions/${txHash}`);
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
          icon={() => <FileTextIcon className="text-black dark:text-white" />}
          key={`transaction-item-${index}`}
          mobileTitlePrefix="TX # "
          title={abbreviateSolanaWalletAddress(tx.txHash.toString())}
          solValue={tx.fee.toString()}
          date={tx.time}
          onClickContainer={(e) => navigateToTransaction(e, tx.txHash)}
          onClickTitle={(e) => navigateToTransaction(e, tx.txHash)}
        >
          <div className="flex flex-1 flex-col">
            <p>
              To{" "}
              <span
                className="text-primary hover:underline"
                onClick={(e) => navigateToTransaction(e, tx.txHash)}
              >
                {abbreviateSolanaWalletAddress(tx.feePayer)}
              </span>
            </p>
          </div>
        </HistoricBlockItem>
      ))}
    </>
  );
};

export default LatestTransactionsContent;
