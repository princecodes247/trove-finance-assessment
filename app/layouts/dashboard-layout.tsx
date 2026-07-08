import { Outlet, useLoaderData } from "react-router";
import { Sidebar } from "../components/layout/sidebar";
import { Header } from "../components/layout/header";
import { apiClient } from "../../lib/api-client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function loader() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: apiClient.getUser });
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
    </HydrationBoundary>
  );
}
