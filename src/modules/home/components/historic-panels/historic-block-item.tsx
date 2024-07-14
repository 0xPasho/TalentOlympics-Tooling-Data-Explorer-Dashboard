import { Badge } from "~/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
const HistoricBlockItem = ({
  mobileTitlePrefix,
  title,
  solValue,
  children,
  date,
  onClickTitle,
  onClickContainer,
  icon,
}: {
  mobileTitlePrefix: string;
  title: string;
  solValue: string;
  children: React.ReactNode;
  date: number;
  onClickTitle: (e: React.MouseEvent<HTMLElement>) => void;
  onClickContainer: (e: React.MouseEvent<HTMLElement>) => void;
  icon: () => React.ReactNode;
}) => {
  const nativeObject = new Date(date * 1000);

  return (
    <div
      onClick={onClickContainer}
      className="flex cursor-pointer flex-col justify-between gap-2 rounded-lg px-2 hover:bg-accent md:flex-row md:items-center"
    >
      <div className="flex flex-1 md:items-start md:space-x-2">
        <div className="hidden h-8 w-8 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800 md:flex">
          <span>{icon()}</span>
        </div>
        <div className="flex w-full flex-row items-center gap-1 md:flex-col md:items-start md:gap-0">
          <span className="text-primary hover:underline" onClick={onClickTitle}>
            <span className="md:hidden">{mobileTitlePrefix}</span>
            <span>{title}</span>
          </span>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(nativeObject, { addSuffix: true })}
          </p>
        </div>
      </div>
      {children}
      <div>
        <Badge className="gap-1" variant="outline">
          {solValue} <span className="text-[0.50rem]">lamports</span>
        </Badge>
      </div>
    </div>
  );
};

export default HistoricBlockItem;
