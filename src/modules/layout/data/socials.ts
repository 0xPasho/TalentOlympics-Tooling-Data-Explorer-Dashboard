import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type SocialNetworks = "GitHub" | "Twitter" | "Instagram";
export interface SocialItem {
  name: SocialNetworks;
  link: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export const socials: SocialItem[] = [
  {
    name: "GitHub",
    link: "https://github.com/0xpasho",
    icon: GitHubLogoIcon,
  },
  {
    name: "Twitter",
    link: "https://x.com/0xpasho",
    icon: TwitterLogoIcon,
  },
  {
    name: "Instagram",
    link: "https://instagram.com/0xpasho",
    icon: InstagramLogoIcon,
  },
];
