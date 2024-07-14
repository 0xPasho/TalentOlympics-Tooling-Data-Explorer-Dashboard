"use client";

import { useCallback, useEffect, useState } from "react";
import { ClusterTransactionData, NetworkRequestResponse } from "../types";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const SpecificTransactionInformationIntent = ({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="flex w-full">
      <div className="flex w-1/4 text-sm uppercase text-gray-500">{title}</div>
      <div className="flex flex-1">
        {loading ? <Skeleton className="h-4 w-full" /> : children}
      </div>
    </div>
  );
};

const SpecificTransactionInformationContent = ({
  txSignature,
}: {
  txSignature: string;
}) => {
  const [transaction, setTransaction] = useState<ClusterTransactionData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = useCallback(async () => {
    try {
      setLoading(true);
      if (error) {
        setError(null);
      }

      const searchParams = new URLSearchParams({
        limit: "100",
        transactionSignature: txSignature,
      }).toString();
      const response = await fetch(`/api/block-information?${searchParams}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error fetching transactions: ${response.statusText}`);
      }
      const responseContent: NetworkRequestResponse<ClusterTransactionData> =
        await response.json();
      if (responseContent.error) {
        throw responseContent.error;
      }
      console.log({ responseContent });
      setTransaction(responseContent.data);
    } catch (err: any) {
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  }, [txSignature]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const dateToFormat = transaction?.time
    ? new Date(transaction?.time * 1000)
    : new Date();

  return (
    <div className="mb-12">
      <Card className="w-full pb-2 pt-4">
        <CardContent className="flex flex-col gap-2 px-4">
          <SpecificTransactionInformationIntent title="Slot" loading={loading}>
            <span>{transaction?.slot}</span>
          </SpecificTransactionInformationIntent>
          <SpecificTransactionInformationIntent
            title="Signature"
            loading={loading}
          >
            <span className="break-all">{transaction?.txHash}</span>
          </SpecificTransactionInformationIntent>
          <SpecificTransactionInformationIntent
            title="Fee(in lamports)"
            loading={loading}
          >
            <span>{transaction?.fee}</span>
          </SpecificTransactionInformationIntent>
          <SpecificTransactionInformationIntent
            title="Fee Payer"
            loading={loading}
          >
            <span className="break-all">{transaction?.feePayer}</span>
          </SpecificTransactionInformationIntent>
          <SpecificTransactionInformationIntent title="Date" loading={loading}>
            <span className="break-all">
              {formatDistanceToNow(dateToFormat, {
                addSuffix: true,
              })}
            </span>
          </SpecificTransactionInformationIntent>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecificTransactionInformationContent;
