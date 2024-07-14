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
  ClusterBlockData,
  NetworkRequestResponse,
} from "~/modules/transactions/types";
import LatestBlocksContent from "./latest-blocks-content";
import Link from "next/link";

const LatestBlocksCard = () => {
  const [blocks, setBlocks] = useState<ClusterBlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    try {
      setLoading(true);
      if (error) {
        setError(null);
      }

      const searchParams = new URLSearchParams({
        limit: "4",
      }).toString();
      const response = await fetch(`/api/latest-blocks?${searchParams}`, {
        cache: "no-cache",
      });
      if (!response.ok) {
        throw new Error(`Error fetching blocks: ${response.statusText}`);
      }
      const responseContent: NetworkRequestResponse<ClusterBlockData[]> =
        await response.json();
      if (responseContent.error) {
        throw responseContent.error;
      }
      setBlocks(responseContent.data);
    } catch (err: any) {
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <Card className="w-full py-0">
      <CardHeader>
        <CardTitle>Latest Blocks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <LatestBlocksContent data={blocks} error={error} loading={loading} />
      </CardContent>
      <CardFooter className="w-full">
        {!!blocks.length && (
          <Link href="/blocks" className="w-full">
            <Button
              variant="outline"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              View All Blocks
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default LatestBlocksCard;
