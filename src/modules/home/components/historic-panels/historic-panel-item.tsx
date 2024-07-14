import { Skeleton } from "~/components/ui/skeleton";

const HistoricPanelItemShimmer = () => {
  return (
    <div className="flex flex-row gap-2">
      <Skeleton className="aspect-square w-12" />
      <div className="fle flex-colx flex-1 gap-2">
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="mt-2 h-4 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default HistoricPanelItemShimmer;
