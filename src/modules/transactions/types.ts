export type ClusterBlockData = {
  slot: number;
  txHash: string;
  feePayer: string;
  fee: number;
  time: number;
  txQuantity: number;
};

export type ClusterTransactionData = {
  txHash: string;
  feePayer: string;
  slot: number;
  fee: number;
  time: number;
};

export type NetworkRequestResponse<T> = {
  data?: T;
  status: number;
  error?: string;
};
