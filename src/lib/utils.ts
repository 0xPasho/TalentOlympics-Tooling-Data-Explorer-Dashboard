import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateSolanaWalletAddress(address: string) {
  if (typeof address !== "string" || address.length < 10) {
    return address; // Return original if it's not a valid address format
  }
  const start = address.slice(0, 5);
  const end = address.slice(-5);

  return `${start}...${end}`;
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BTC",
  currencyDisplay: "code",
});

export const btcFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "never",
  maximumFractionDigits: 6,
  currencyDisplay: "code",
});
