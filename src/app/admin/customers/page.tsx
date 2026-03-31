import { Search, MoreHorizontal, UserCircle2 } from "lucide-react";

const customers = [
    { id: "CUST-10A", name: "Chioma Adebayo", email: "chioma@example.com", joined: "Jan 12, 2026", orders: 4, spent: 1200000, status: "Active" },
    { id: "CUST-10B", name: "Emeka Okafor", email: "emeka.ok@test.ng", joined: "Feb 05, 2026", orders: 2, spent: 2500000, status: "Active" },
    { id: "CUST-10C", name: "Aisha Mohammed", email: "aisha.m@outlook.ng", joined: "Mar 10, 2026", orders: 1, spent: 680000, status: "Inactive" }
];

export default function AdminCustomersPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Customers</h1>

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
                            {customers.map((customer) => (
                                <tr key={customer.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                                <UserCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{customer.name}</p>
                                                <p className="text-sm text-neutral-400">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-neutral-300">{customer.joined}</td>
                                    <td className="py-4 text-white font-medium">{customer.orders}</td>
                                    <td className="py-4 text-white font-bold">₦{customer.spent.toLocaleString()}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
