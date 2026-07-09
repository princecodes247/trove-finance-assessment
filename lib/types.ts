export interface IUser {
  name: string;
  accountId: string;
  lastUpdated: string;
}

export interface IPortfolioSummary {
  totalPortfolioValue: number;
  totalInvested: number;
  currency: string;
}

export interface IHolding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  currency: string;
}

export type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";
export interface ITransaction {
  id: string;
  type: "BUY" | "SELL";
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: TransactionStatus;
}

export type TimeSpan = "1D" | "1W" | "1M" | "ALL";

export interface IHistoricalDataPoint {
  time: string;
  value: number;
}
