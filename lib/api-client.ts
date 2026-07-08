import portfolioData from "./data/portfolio_data.json";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type PortfolioData = typeof portfolioData;
export type TTransaction = {
  id: string;
  type: "BUY" | "SELL";
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
};

export const apiClient = {
  getPortfolioData: async (): Promise<PortfolioData> => {
    await delay(800);
    return portfolioData;
  },

  getUser: async () => {
    await delay(500);
    return portfolioData.user;
  },
  getSummary: async () => {
    await delay(500);
    return portfolioData.summary;
  },
  getHoldings: async () => {
    await delay(500);
    return portfolioData.holdings;
  },
  getTransactions: async () => {
    await delay(900);
    return portfolioData.transactions as TTransaction[];
  }
};
