import Link from "next/link";
import { SiteLinkItem } from "../../data/site-links";

const LinkItem = ({ link }: { link: SiteLinkItem }) => {
  return (
    <li>
      <Link href={link.path} prefetch={false} target={link.target}>
        {link.title}
      </Link>
    </li>
  );
};

export default LinkItem;
