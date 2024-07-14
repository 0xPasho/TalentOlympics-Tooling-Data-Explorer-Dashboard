import { NextRequest, NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";
import { ClusterTransactionData } from "~/modules/transactions/types";
import { env } from "~/env.mjs";

export async function GET(req: NextRequest) {
  try {
    let initialPayloadNewBlock = req.nextUrl.searchParams.get("newBlock");
    let initialPayloadLimit = req.nextUrl.searchParams.get("limit");
    let newBlock = null;
    let limit = null;
    if (initialPayloadNewBlock && typeof initialPayloadNewBlock === "string") {
      newBlock = parseInt(initialPayloadNewBlock);
    }

    if (initialPayloadLimit && typeof initialPayloadLimit === "string") {
      limit = parseInt(initialPayloadLimit);
    }
    const connection = new Connection(env.ALCHEMY_RPC_URL, {
      disableRetryOnRateLimit: true,
    });

    let latestBlock = newBlock || 0;
    if (!latestBlock) {
      latestBlock = await connection.getSlot();
    }

    const blockData = await connection.getBlock(latestBlock, {
      maxSupportedTransactionVersion: 0,
    });

    const txResults: ClusterTransactionData[] = [];
    const txToProcess = limit
      ? blockData.transactions.slice(0, limit)
      : blockData.transactions;
    for (const blockResponse of txToProcess) {
      txResults.push({
        txHash: blockResponse.transaction.signatures[0],
        feePayer:
          blockResponse.transaction.message.staticAccountKeys[0].toBase58(),
        fee: blockResponse.meta?.fee ?? 0,
        time: blockData.blockTime,
        slot: blockData.parentSlot,
      });
    }

    return NextResponse.json({ status: 200, data: txResults });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
