import { Search, MoreHorizontal, UserCircle2 } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const revalidate = 0;

export default async function AdminCustomersPage() {
    const [ { data: dbProfiles }, { data: dbOrders } ] = await Promise.all([
        supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('orders').select('user_id, total, status')
    ]);

    const allProfiles = dbProfiles || [];
    const allOrders = dbOrders || [];

    const customers = allProfiles.map(profile => {
        const userOrders = allOrders.filter(o => o.user_id === profile.id);
        const totalSpent = userOrders.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
        const parsedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
        
        return {
            id: profile.id,
            name: profile.name || 'Guest User',
            email: profile.email || 'N/A',
            joined: parsedDate,
            orders: userOrders.length,
            spent: totalSpent,
            status: userOrders.length > 0 ? "Active" : "New User"
        };
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-white">Customers</h1>
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
                            placeholder="Search customers..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                <th className="pb-4 pl-4 font-medium">Customer</th>
                                <th className="pb-4 font-medium">Joined Date</th>
                                <th className="pb-4 font-medium">Total Orders</th>
                                <th className="pb-4 font-medium">Total Spent</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 pr-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {customers.length > 0 ? customers.map((customer) => (
                                <tr key={customer.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                                <UserCircle2 className="w-6 h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-white truncate max-w-[200px]">{customer.name}</p>
                                                <p className="text-sm text-neutral-400 truncate max-w-[200px]">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-neutral-300">{customer.joined}</td>
                                    <td className="py-4 text-white font-medium">{customer.orders}</td>
                                    <td className="py-4 text-white font-bold">₦{customer.spent.toLocaleString()}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 flex items-center justify-center w-fit min-w-20 rounded-full text-xs font-medium border ${
                                            customer.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' : 
                                            'bg-neutral-500/20 text-neutral-400 border-neutral-500/20'
                                        }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-neutral-500">
                                        No registered customers found.
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
