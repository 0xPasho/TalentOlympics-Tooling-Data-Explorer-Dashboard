import Link from "next/link";
import { SiteLinkItem } from "../../data/site-links";

const LinkItem = ({ link }: { link: SiteLinkItem }) => {
  return (
    <Link
      href={link.path}
      className="text-sm font-medium underline-offset-4 hover:underline"
      prefetch={false}
      target={link.target}
    >
      {link.title}
    </Link>
  );
};

export default LinkItem;
