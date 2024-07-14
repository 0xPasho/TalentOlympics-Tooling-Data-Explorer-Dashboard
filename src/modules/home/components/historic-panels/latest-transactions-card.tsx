"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import {
  ClusterTransactionData,
  NetworkRequestResponse,
} from "~/modules/transactions/types";
import Link from "next/link";
import LatestTransactionsContent from "./latest-transactions-content";

const LatestTransactionsCard = () => {
  const [transactions, setTransactions] = useState<ClusterTransactionData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      if (error) {
        setError(null);
      }

      const searchParams = new URLSearchParams({
        limit: "4",
      }).toString();
      const response = await fetch(`/api/latest-transactions?${searchParams}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error fetching transactions: ${response.statusText}`);
      }
      const responseContent: NetworkRequestResponse<ClusterTransactionData[]> =
        await response.json();
      if (responseContent.error) {
        throw responseContent.error;
      }
      setTransactions(responseContent.data);
    } catch (err: any) {
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card className="w-full py-0">
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <LatestTransactionsContent
          data={transactions}
          error={error}
          loading={loading}
        />
      </CardContent>
      <CardFooter className="w-full">
        {!!transactions.length && (
          <Link href="/transactions" className="w-full">
            <Button
              variant="outline"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              View All Transactions
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default LatestTransactionsCard;
