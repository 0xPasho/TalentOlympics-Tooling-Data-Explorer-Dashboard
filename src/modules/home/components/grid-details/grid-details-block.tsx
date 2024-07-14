import { Skeleton } from "~/components/ui/skeleton";
import useGlobalStore from "~/modules/global/store/store";

const GridBlock = ({
  icon,
  title,
  description,
}: {
  icon: () => React.ReactNode;
  title: string;
  description: string;
}) => {
  const { solanaStatus } = useGlobalStore();

  if (!solanaStatus) {
    return (
      <div className="flex flex-row gap-2 px-4 py-2">
        <div className="flex items-center pt-1">
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="flex flex-1 flex-col">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-2 h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 px-4 py-2">
      <div className="flex items-center pt-1">{icon()}</div>
      <div className="flex flex-1 flex-col">
        <span className="text-sm uppercase text-gray-500 ">{title}</span>
        <span className="uppercase">{description}</span>
      </div>
    </div>
  );
};

export default GridBlock;
