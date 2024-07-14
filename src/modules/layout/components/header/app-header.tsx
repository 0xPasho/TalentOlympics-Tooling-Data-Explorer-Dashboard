import Link from "next/link";
import { BoxModelIcon } from "@radix-ui/react-icons";
import { siteLinks } from "../../data/site-links";
import LinkItem from "./header-link-item";
import { APP_NAME } from "~/constants";
import { ThemeSwitcher } from "../theme-switcher";
import AppBanner from "../banner/app-banner";

const AppHeader = () => {
  return (
    <>
      <header className="w-full  bg-gray-100 dark:bg-black ">
        <AppBanner />
      </header>
      <header className="container:px-0 mx-auto flex h-14 max-w-container items-center px-4 lg:px-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-1"
          prefetch={false}
        >
          <BoxModelIcon className="h-6 w-6 fill-black dark:fill-white" />
          <span>{APP_NAME}</span>
          <span className="sr-only">{APP_NAME}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {siteLinks.map((link, index) => (
            <LinkItem key={`header-link-item-${index}`} link={link} />
          ))}
          <div className="hidden sm:flex">
            <ThemeSwitcher />
          </div>
        </nav>
      </header>
    </>
  );
};

export default AppHeader;
