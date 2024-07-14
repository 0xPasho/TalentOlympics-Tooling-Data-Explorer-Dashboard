import Globe from "./globe";
import HeroInput from "./hero-input";

const HeroSection = ({ title }: { title?: string }) => {
  const defaultTitle = "The Solana Blockchain Explorer";
  return (
    <div className="relative mx-auto mt-6 min-h-[300px] max-w-container overflow-hidden md:mt-12">
      <div className="z-10 flex h-full w-full flex-col px-4">
        <h1 className="mb-2 text-center text-3xl md:text-4xl">
          {title || defaultTitle}
        </h1>
        <HeroInput />
      </div>
      <div className="absolute -z-10 h-72 w-full overflow-hidden">
        <div className="relative">
          <Globe className="top-0 md:-top-10" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
