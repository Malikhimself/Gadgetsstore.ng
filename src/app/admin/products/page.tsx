import { Plus, Search, MoreHorizontal, Edit, Trash } from "lucide-react";
import { products } from "@/lib/data";

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-bold flex items-center gap-2 hover:bg-accent/90 transition-colors">
                    <Plus className="w-4 h-4" /> Add Product
                </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-neutral-400 text-sm">
                                <th className="pb-4 pl-4 font-medium">Product</th>
                                <th className="pb-4 font-medium">Category</th>
                                <th className="pb-4 font-medium">Price</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 pr-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden">
                                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-neutral-300">{product.category}</td>
                                    <td className="py-4 text-white font-bold">₦{product.price.toLocaleString()}</td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/20 rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
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
