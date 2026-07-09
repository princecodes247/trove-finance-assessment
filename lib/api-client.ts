import { z } from "zod";
import portfolioData from "./data/portfolio_data.json";
import { generateProceduralCurve } from "./data/utils";
import type { IUser, IPortfolioSummary, IHolding, ITransaction, IHistoricalDataPoint } from "./types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  login: async (credentials: any) => {
    await delay(1000); // Simulate network latency
    return { success: true, user: portfolioData.user };
  },

  register: async (userData: any) => {
    await delay(1000); // Simulate network latency
    return { success: true, user: portfolioData.user };
  },

  getPortfolioData: async () => {
    await delay(800);
    return portfolioData;
  },

  getUser: async (): Promise<IUser> => {
    await delay(500);
    return portfolioData.user;
  },
  getSummary: async (): Promise<IPortfolioSummary> => {
    await delay(500);
    return portfolioData.summary;
  },
  getHoldings: async (): Promise<IHolding[]> => {
    await delay(500);
    return portfolioData.holdings;
  },
  getTransactions: async (): Promise<ITransaction[]> => {
    await delay(900);
    return portfolioData.transactions as ITransaction[];
  },
  getPortfolioHistory: async (days = 90, volatilityRange: [number, number] = [-0.015, 0.015]): Promise<IHistoricalDataPoint[]> => {
    await delay(600);
    return generateProceduralCurve({
      startValue: portfolioData.summary.totalInvested,
      endValue: portfolioData.summary.totalPortfolioValue,
      days,
      volatilityRange,
      endDate: portfolioData.user.lastUpdated
    });
  }
};
