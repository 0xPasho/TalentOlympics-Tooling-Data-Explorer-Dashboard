import { Metadata } from "next";
import HeroSection from "~/modules/home/components/hero/hero-content";
import SpecificTransactionInformationContent from "~/modules/transactions/components/specific-transaction-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Transaction | Solana (SOL) Blockchain Explorer",
  description: "Solana (SOL) Blockchain Explorer",
};

interface SpecificTransactionPageProps {
  params: {
    txSignature: string;
  };
}

export default function TransactionPage({
  params: { txSignature },
}: SpecificTransactionPageProps) {
  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-container px-4">
        <SpecificTransactionInformationContent txSignature={txSignature} />
      </div>
    </>
  );
}
