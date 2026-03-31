import { Search, MoreHorizontal } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const revalidate = 0;

export default async function AdminOrdersPage() {
    const { data: dbOrders } = await supabaseAdmin
        .from('orders')
        .select(`
            *,
            profiles(name, email)
        `)
        .order('created_at', { ascending: false });

    const orders = dbOrders || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-white">Orders</h1>
                {!process.env.SUPABASE_SERVICE_ROLE_KEY && (
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg font-medium">
                        Missing SUPABASE_SERVICE_ROLE_KEY. Data cannot sync correctly.
                    </div>
                )}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                <th className="pb-4 pl-4 font-medium">Order ID</th>
                                <th className="pb-4 font-medium">Customer</th>
                                <th className="pb-4 font-medium">Date</th>
                                <th className="pb-4 font-medium">Total</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 pr-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length > 0 ? orders.map((order) => {
                                const customerName = order.profiles?.name || 'Guest User';
                                const customerEmail = order.profiles?.email || 'N/A';
                                const parsedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                });
                                
                                return (
                                    <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 pl-4 font-medium text-white">{order.id}</td>
                                        <td className="py-4">
                                            <div>
                                                <p className="font-medium text-white">{customerName}</p>
                                                <p className="text-sm text-neutral-400">{customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 text-neutral-300">{parsedDate}</td>
                                        <td className="py-4 text-white font-bold">₦{Number(order.total).toLocaleString()}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                                order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' : 
                                                order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400 border-blue-500/20' : 
                                                'bg-yellow-500/20 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-neutral-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
