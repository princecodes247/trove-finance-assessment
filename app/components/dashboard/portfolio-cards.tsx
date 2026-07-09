export function PortfolioCards() {
  const cards = [
    { title: "US Portfolio", value: "$32,140.00", change: "+2.4%", isPositive: true },
    { title: "NG Portfolio", value: "₦4,250,000", change: "-1.2%", isPositive: false },
    { title: "Fixed Income", value: "$8,500.00", change: "+0.5%", isPositive: true },
    { title: "GEMS", value: "$3,360.75", change: "+5.8%", isPositive: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div key={card.title} className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="text-[12px] font-medium text-text-neutral mb-2">{card.title}</div>
          <div className="text-[18px] font-bold text-text-default mb-4">{card.value}</div>
          <div className={`text-[12px] font-semibold ${card.isPositive ? 'text-positive' : 'text-negative'}`}>
            {card.change}
          </div>
        </div>
      ))}
    </div>
  );
}
