import { socials } from "../../data/socials";
import SocialNetworkItem from "./social-network-item";
import { legalLinks, siteLinks } from "../../data/site-links";
import LinkItem from "./footer-link-item";
import { BoxModelIcon } from "@radix-ui/react-icons";
import { APP_NAME } from "~/constants";
import { ThemeSwitcher } from "../theme-switcher";

const FooterContent = () => {
  return (
    <footer className="bg-gray-100 py-12 dark:bg-black">
      <div className="container mx-auto space-y-8 px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-500">
              <LinkItem
                link={{
                  path: "/",
                  title: "Home",
                }}
              />
              {siteLinks.map((link, index) => (
                <LinkItem key={`link-item-${index}`} link={link} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-500">
              {legalLinks.map((link, index) => (
                <LinkItem key={`legal-link-item-${index}`} link={link} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start lg:col-span-1">
            <div className="flex items-center gap-2">
              <BoxModelIcon className="h-6 w-6 text-black dark:text-white" />
              <span className="text-lg">{APP_NAME}</span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-500">
              {APP_NAME} is a Block Explorer and Analytics Platform for Solana,
              a high-performance blockchain supporting decentralized
              applications and crypto assets.
            </p>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <hr className="mt-8" />
        <div className="mt-8 flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-500">Powered by</span>
            <BoxModelIcon className="h-6 w-6 text-black dark:text-white" />
            <span className="text-lg">{APP_NAME}</span>
          </div>
          <div className="flex items-center space-x-4">
            {socials.map((social, index) => (
              <SocialNetworkItem
                key={`social-network-${index}`}
                social={social}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterContent;
