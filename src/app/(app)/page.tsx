import { Metadata } from "next";
import GridDetails from "~/modules/home/components/grid-details/grid-details-content";
import HeroSection from "~/modules/home/components/hero/hero-content";
import HistoricPanelsContent from "~/modules/home/components/historic-panels/historic-panels-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Solana (SOL) Blockchain Explorer",
  description: "Solana (SOL) Blockchain Explorer",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container:px-0 px-4">
        <GridDetails />
      </div>
      <HistoricPanelsContent />
    </>
  );
}
