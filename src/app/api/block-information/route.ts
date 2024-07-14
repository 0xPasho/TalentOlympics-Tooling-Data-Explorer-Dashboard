import { NextRequest, NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";
import { env } from "~/env.mjs";

export async function GET(req: NextRequest) {
  try {
    const transactionSignature = req.nextUrl.searchParams.get(
      "transactionSignature",
    );

    if (!transactionSignature) {
      return NextResponse.json({
        error: "Transaction signature is required",
        status: 400,
      });
    }

    const connection = new Connection(env.ALCHEMY_RPC_URL, {
      disableRetryOnRateLimit: true,
    });

    const transaction = await connection.getTransaction(transactionSignature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found", status: 404 });
    }

    const transactionData = {
      slot: transaction.slot,
      txHash: transaction.transaction.signatures[0],
      feePayer: transaction.transaction.message.staticAccountKeys[0].toBase58(),
      fee: transaction.meta?.fee ?? 0,
      time: transaction.blockTime,
      txQuantity: 1,
    };

    return NextResponse.json({ status: 200, data: transactionData });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
