import { NextRequest, NextResponse } from "next/server";
import { Connection, VersionedBlockResponse } from "@solana/web3.js";
import { ClusterBlockData } from "~/modules/transactions/types";
import { env } from "~/env.mjs";

export async function GET(req: NextRequest) {
  try {
    let initialPayloadLatestBlock = req.nextUrl.searchParams.get("latestBlock");
    let initialPayloadLimit = req.nextUrl.searchParams.get("limit");
    let payloadLatestBlock = null;
    let limit = 4;
    if (
      initialPayloadLatestBlock &&
      typeof initialPayloadLatestBlock === "string"
    ) {
      payloadLatestBlock = parseInt(initialPayloadLatestBlock);
    }

    if (initialPayloadLimit && typeof initialPayloadLimit === "string") {
      limit = parseInt(initialPayloadLimit);
    }

    const connection = new Connection(env.ALCHEMY_RPC_URL, {
      disableRetryOnRateLimit: true,
    });

    let latestBlock = payloadLatestBlock || 0;
    if (!latestBlock) {
      latestBlock = await connection.getSlot();
    }

    const blocksPromises = new Array(limit).fill(0).map((_, index) =>
      connection.getBlock(latestBlock - index, {
        maxSupportedTransactionVersion: 0,
      }),
    );

    const blockResponses = await Promise.allSettled(blocksPromises);
    const blockResults: ClusterBlockData[] = [];
    for (const blockResponse of blockResponses) {
      if (blockResponse.status === "rejected") {
        continue;
      }
      const blockData: VersionedBlockResponse = blockResponse.value;
      blockResults.push({
        slot: blockData.parentSlot ?? 0,
        txHash: blockData.transactions[0].transaction.signatures[0],
        feePayer:
          blockData.transactions[0].transaction.message.staticAccountKeys[0].toBase58(),
        fee: blockData.transactions[0].meta?.fee ?? 0,
        time: blockData.blockTime,
        txQuantity: blockData.transactions.length,
      });
    }

    return NextResponse.json({ status: 200, data: blockResults });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
