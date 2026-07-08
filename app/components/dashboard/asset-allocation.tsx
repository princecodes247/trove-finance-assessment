export function AssetAllocation() {
  const assets = [
    { name: "Technology", value: 45, color: "bg-primary" },
    { name: "Automotive", value: 25, color: "bg-accent-blue" },
    { name: "Healthcare", value: 15, color: "bg-primary-light" },
    { name: "Finance", value: 15, color: "bg-purple" },
  ];

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-[15px] font-bold text-text-default mb-8">Asset Allocation</h3>
      
      {/* Stacked Bar */}
      <div className="w-full h-4 rounded-full flex overflow-hidden mb-10">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className={`h-full ${asset.color}`}
            style={{ width: `${asset.value}%` }}
          />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-auto">
        {assets.map((asset) => (
          <div key={asset.name} className="flex items-start">
            <div className={`w-2.5 h-2.5 rounded-full mt-1 mr-3 shrink-0 ${asset.color}`} />
            <div>
              <div className="text-[12px] text-text-neutral mb-0.5">{asset.name}</div>
              <div className="text-[14px] font-bold text-text-default">{asset.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
