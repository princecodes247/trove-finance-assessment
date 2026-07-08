import { Outlet } from "react-router";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

