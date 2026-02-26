interface StatProps{
  title: string;
  value: string;
  description: string;
  icon: string;
  trend?: string;
}

export function StatCard({ title, value, description, icon, trend }: StatProps) {
  return(
    <main>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 rounded-xl text-2xl">
            {icon}
          </div>
          {trend && (
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded-full">
              {trend} 
            </span>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      </div> 
    </main>
  );
}

export default function StatsOverview() {
  const stats = [
    {
      title: "Konten Dibuat",
      value: "12",
      description: "Total video diproses",
      icon: "🎬",
      trend: "+2 hari ini"
    },
    {
      title: "Sedang Antre",
      value: "2",
      description: "Video dalam proses AI",
      icon: "⏳"
    },
    {
      title: "Post Terjadwal",
      value: "5",
      description: "Siap tayang besok",
      icon: "📅"
    },
    {
      title: "Status AI",
      value: "Online",
      description: "Sistem siap bekerja",
      icon: "🤖"
    }
  ];
  
  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat,index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}