import { Outlet, useLoaderData } from "react-router";
import { Sidebar } from "../components/layout/sidebar";
import { Header } from "../components/layout/header";
import { apiClient } from "../../lib/api-client";
import { createQueryClient } from "../../lib/query-client";
import { dashboardKeys } from "../../lib/query-keys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function loader() {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({ 
    queryKey: dashboardKeys.user(), 
    queryFn: apiClient.getUser 
  });
  return { dehydratedState: dehydrate(queryClient) };
}

export default function DashboardLayout() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
    </HydrationBoundary>
  );
}
