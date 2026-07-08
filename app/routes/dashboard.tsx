export default function Dashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to your Dashboard</h2>
      <p className="text-gray-500">
        This is a protected area. You can manage your account and view your data here.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">71,897</dd>
          </div>
        </div>
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Avg. Open Rate</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">58.16%</dd>
          </div>
        </div>
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Avg. Click Rate</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">24.57%</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
