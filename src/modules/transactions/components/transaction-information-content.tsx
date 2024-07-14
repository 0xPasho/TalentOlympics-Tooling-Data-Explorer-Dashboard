"use client";

import { useCallback, useEffect, useState } from "react";
import { ClusterTransactionData, NetworkRequestResponse } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import LatestTransactionsContent from "~/modules/home/components/historic-panels/latest-transactions-content";

const TransactionInformationContent = () => {
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

      const latestBlock = transactions.length
        ? transactions[transactions.length - 1].slot.toString()
        : "";

      const searchParams = new URLSearchParams({
        limit: "100",
        newBlock: latestBlock,
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
      setTransactions((data) => [...data, ...responseContent.data]);
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
    <div className="">
      <Card className="w-full py-0">
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 px-4">
          <LatestTransactionsContent
            data={transactions}
            error={error}
            loading={loading && !transactions.length}
          />
        </CardContent>
        <CardFooter className="w-full">
          <Button
            variant="outline"
            className="w-full"
            loading={loading}
            disabled={loading}
            onClick={() => {
              fetchTransactions();
            }}
          >
            Get more
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionInformationContent;
