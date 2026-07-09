export const dashboardKeys = {
  all: ["dashboard"] as const,
  user: () => [...dashboardKeys.all, "user"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
  holdings: () => [...dashboardKeys.all, "holdings"] as const,
  transactions: () => [...dashboardKeys.all, "transactions"] as const,
  portfolioHistory: (span: string) => [...dashboardKeys.all, "portfolioHistory", span] as const,
};
