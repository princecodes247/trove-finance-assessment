import { Outlet, Link } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden sm:flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-800">
          App Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700">
            Overview
          </Link>
          <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">User</span>
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Logout
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
