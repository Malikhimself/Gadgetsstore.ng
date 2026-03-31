import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const NairaIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 10h16" />
        <path d="M4 14h16" />
        <path d="M7 20V4l10 16V4" />
    </svg>
);

const stats = [
    { label: "Total Revenue", value: "₦45,231,890.00", change: "+20.1%", icon: NairaIcon, color: "text-emerald-500" },
    { label: "Active Orders", value: "+573", change: "+201 since last hour", icon: ShoppingCart, color: "text-blue-500" },
    { label: "Products In Stock", value: "2,345", change: "+19 new products", icon: Package, color: "text-purple-500" },
    { label: "Active Users", value: "+2350", change: "+180 since last hour", icon: Users, color: "text-orange-500" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <span className="text-sm text-neutral-400">Overview of your store's performance</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-neutral-400">{stat.label}</span>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-neutral-500">{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Charts / Activity Section (Mock) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-6">Revenue Over Time</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90, 60, 95].map((h, i) => (
                            <div key={i} className="bg-accent/20 hover:bg-accent/40 w-full rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ₦{h}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-neutral-500">
                        <span>Jan</span><span>Dec</span>
                    </div>
                </div>

                <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-6">Recent Sales</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-white">James Doe</div>
                                    <div className="text-xs text-neutral-500">purchased AeroDrone X1</div>
                                </div>
                                <div className="text-sm font-bold text-emerald-500">+₦750,000</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
