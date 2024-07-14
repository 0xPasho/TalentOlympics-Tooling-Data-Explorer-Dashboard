import LatestBlocksCard from "./latest-blocks-card";
import LatestTransactionsCard from "./latest-transactions-card";

const HistoricPanelsContent = () => {
  return (
    <div className="mx-auto my-8 max-w-container">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <LatestBlocksCard />
        <LatestTransactionsCard />
      </div>
    </div>
  );
};

export default HistoricPanelsContent;
