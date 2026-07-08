export default function Dashboard() {
  return (
    <div className="bg-surface shadow-sm border border-border rounded-xl p-8">
      <h2 className="text-xl font-semibold text-text-default mb-2">Welcome to your Dashboard</h2>
      <p className="text-[14px] text-text-neutral mb-8">
        This is a protected area. You can manage your account and view your data here.
      </p>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-background border border-border rounded-xl p-6">
          <dt className="text-[12px] font-medium text-text-neutral truncate mb-1">Total Users</dt>
          <dd className="text-[28px] font-semibold text-text-default">71,897</dd>
        </div>
        
        <div className="bg-background border border-border rounded-xl p-6">
          <dt className="text-[12px] font-medium text-text-neutral truncate mb-1">Avg. Open Rate</dt>
          <dd className="text-[28px] font-semibold text-text-default">58.16%</dd>
        </div>
        
        <div className="bg-background border border-border rounded-xl p-6">
          <dt className="text-[12px] font-medium text-text-neutral truncate mb-1">Avg. Click Rate</dt>
          <dd className="text-[28px] font-semibold text-text-default">24.57%</dd>
        </div>
      </div>
    </div>
  );
}
