"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ClusterBlockData,
  ClusterTransactionData,
  NetworkRequestResponse,
} from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import LatestBlocksContent from "~/modules/home/components/historic-panels/latest-blocks-content";

const BlocksInformationContent = () => {
  const [blocks, setBlocks] = useState<ClusterBlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    try {
      setLoading(true);
      if (error) {
        setError(null);
      }

      const latestBlock = blocks.length
        ? blocks[blocks.length - 1].slot.toString()
        : "";

      const searchParams = new URLSearchParams({
        limit: "100",
        latestBlock,
      }).toString();
      const response = await fetch(`/api/latest-blocks?${searchParams}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error fetching Block: ${response.statusText}`);
      }
      const responseContent: NetworkRequestResponse<ClusterBlockData[]> =
        await response.json();
      if (responseContent.error) {
        throw responseContent.error;
      }
      setBlocks((data) => [...data, ...responseContent.data]);
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
    <div className="">
      <Card className="w-full py-0">
        <CardHeader>
          <CardTitle>Latest Blocks</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 px-4">
          <LatestBlocksContent
            data={blocks}
            error={error}
            loading={loading && !blocks.length}
          />
        </CardContent>
        <CardFooter className="w-full">
          <Button
            variant="outline"
            className="w-full"
            loading={loading}
            disabled={loading}
            onClick={() => {
              fetchBlocks();
            }}
          >
            Get more
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlocksInformationContent;
