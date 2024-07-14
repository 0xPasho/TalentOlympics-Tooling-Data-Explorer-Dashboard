import { Metadata } from "next";
import HeroSection from "~/modules/home/components/hero/hero-content";
import BlocksInformationContent from "~/modules/transactions/components/blocks-information-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Transactions | Solana (SOL) Blockchain Explorer",
  description: "Solana (SOL) Blockchain Explorer",
};

export default function TransactionsPage() {
  return (
    <>
      <HeroSection title="Blocks" />
      <div className="container:px-0 mx-auto max-w-container px-4">
        <BlocksInformationContent />
      </div>
    </>
  );
}
