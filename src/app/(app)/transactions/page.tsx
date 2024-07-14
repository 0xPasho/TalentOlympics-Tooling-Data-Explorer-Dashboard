import { Metadata } from "next";
import HeroSection from "~/modules/home/components/hero/hero-content";
import TransactionInformationContent from "~/modules/transactions/components/transaction-information-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Transactions | Solana (SOL) Blockchain Explorer",
  description: "Solana (SOL) Blockchain Explorer",
};

export default function TransactionsPage() {
  return (
    <>
      <HeroSection title="Transactions" />
      <div className="container:px-0 mx-auto max-w-container px-4">
        <TransactionInformationContent />
      </div>
    </>
  );
}
