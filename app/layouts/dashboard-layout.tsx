import { Outlet } from "react-router";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

