import { Outlet, useLoaderData } from "react-router";
import { Sidebar } from "../components/layout/sidebar";
import { Header } from "../components/layout/header";
import { MobileNav } from "../components/layout/mobile-nav";
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
      <div className="h-screen bg-background flex pb-[env(safe-area-inset-bottom)] w-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-28 lg:pb-10 min-w-0">
            <div className="max-w-[1440px] mx-auto w-full h-full">
              <Outlet />
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    </HydrationBoundary>
  );
}
