import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { products as localProducts } from "@/lib/data";

const NairaIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 10h16" />
        <path d="M4 14h16" />
        <path d="M7 20V4l10 16V4" />
    </svg>
);

export const revalidate = 0; // Always fetch fresh data on dashboard load

export default async function AdminDashboardPage() {
    // 1. Fetch Orders from Supabase
    const { data: dbOrders } = await supabaseAdmin
        .from('orders')
        .select(`
            *,
            profiles(name, email)
        `)
        .order('created_at', { ascending: false });

    // 2. Fetch Users Count
    const { count: usersCount } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    const ordersList = dbOrders || [];
    
    // Calculate Stats
    const totalRevenue = ordersList.reduce((acc, order) => acc + (Number(order.total) || 0), 0);
    const activeOrders = ordersList.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
    const totalProducts = localProducts.length;

    const stats = [
        { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, change: "+Live Sync", icon: NairaIcon, color: "text-emerald-500" },
        { label: "Active Orders", value: activeOrders.length.toString(), change: `${ordersList.length} total ever`, icon: ShoppingCart, color: "text-blue-500" },
        { label: "Products Catalog", value: totalProducts.toString(), change: "From src/lib/data.ts", icon: Package, color: "text-purple-500" },
        { label: "Registered Users", value: (usersCount || 0).toString(), change: "Synced with Auth", icon: Users, color: "text-orange-500" },
    ];

    // Get 5 most recent sales
    const recentSales = ordersList.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <span className="text-sm text-neutral-400">Overview of your store's performance</span>
                </div>
                {!process.env.SUPABASE_SERVICE_ROLE_KEY && (
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg font-medium">
                        Missing SUPABASE_SERVICE_ROLE_KEY. Data cannot sync correctly.
                    </div>
                )}
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

            {/* Charts / Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-6">Revenue Overview</h3>
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
                    <p className="text-xs text-neutral-600 mt-2 italic text-center">Chart visualization is currently using placeholder data representation.</p>
                </div>

                <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-6">Recent Sales</h3>
                    <div className="space-y-6">
                        {recentSales.length > 0 ? recentSales.map((order) => {
                            const customerName = order.profiles?.name || 'Guest User';
                            const initials = customerName.substring(0, 2).toUpperCase();
                            // Try to get first product name from the JSONB
                            let purchasedItem = "Multiple items";
                            if (Array.isArray(order.products) && order.products.length > 0) {
                                purchasedItem = order.products[0].name || purchasedItem;
                                if (order.products.length > 1) {
                                    purchasedItem += ` +${order.products.length - 1} more`;
                                }
                            }
                            return (
                                <div key={order.id} className="flex items-center gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                                        {initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">{customerName}</div>
                                        <div className="text-xs text-neutral-500 truncate">bought {purchasedItem}</div>
                                    </div>
                                    <div className="text-sm font-bold text-emerald-500 shrink-0">+₦{Number(order.total).toLocaleString()}</div>
                                </div>
                            );
                        }) : (
                            <div className="text-sm text-neutral-500 text-center py-8">
                                No sales yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
