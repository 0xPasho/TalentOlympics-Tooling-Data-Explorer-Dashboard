import Link from "next/link";
import { SocialItem } from "../../data/socials";
import { Button } from "~/components/ui/button";

const SocialNetworkItem = ({ social }: { social: SocialItem }) => {
  return (
    <Link href={social.link} target="_blank">
      <Button className="gap-1 p-0 text-black dark:text-white" variant="link">
        <social.icon />
        {social.name}
      </Button>
    </Link>
  );
};

export default SocialNetworkItem;
