import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    },
  },
});
