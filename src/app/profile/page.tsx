"use client";

import { useAuth } from "@/context/AuthContext";
import { 
    PackageSearch, 
    MessageSquare, 
    History, 
    Ticket, 
    LogOut, 
    Settings,
    UserCircle,
    X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export default function ProfilePage() {
    const { user, orders, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'orders' | 'messages' | 'history' | 'coupons'>('orders');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile.</h2>
                        <button onClick={() => router.push('/login')} className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-bold">
                            Go to Login
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const tabs = [
        { id: 'orders', label: 'My Orders', icon: PackageSearch },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'history', label: 'Browsing History', icon: History },
        { id: 'coupons', label: 'Coupons & Offers', icon: Ticket },
    ] as const;

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Context */}
                <div className="flex items-center gap-6 mb-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-24 h-24 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
                        <UserCircle className="w-12 h-12" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                        <p className="text-neutral-400">{user.email}</p>
                    </div>
                    <div className="ml-auto flex gap-4">
                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Settings className="w-5 h-5 text-neutral-400" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="md:col-span-1 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-medium text-left",
                                        activeTab === tab.id 
                                            ? "bg-accent text-accent-foreground shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                                            : "bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 min-h-[500px]">
                            {activeTab === 'orders' && (
                                <>
                                {orders && orders.length > 0 ? (
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white mb-6">Order History</h3>
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent/30 transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-accent font-bold">{order.id}</span>
                                                        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">{order.status}</span>
                                                    </div>
                                                    <p className="text-neutral-400 text-sm">{order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}</p>
                                                </div>
                                                <div className="text-left md:text-right">
                                                    <p className="text-xl font-bold text-white mb-2">₦{order.total.toLocaleString()}</p>
                                                    <button 
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-sm font-bold text-white hover:text-accent transition-colors">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <PackageSearch className="w-8 h-8 text-neutral-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">No Active Orders</h3>
                                        <p className="text-neutral-400">You haven't placed any orders yet. Go explore the shop!</p>
                                    </div>
                                )}
                                
                                {/* Order Details Modal */}
                                {selectedOrder && (
                                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                                        <div className="bg-[#09090b] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-1">Order Details</h3>
                                                    <p className="text-sm text-neutral-400">Order ID: <span className="text-accent">{selectedOrder.id}</span></p>
                                                </div>
                                                <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                                    <X className="w-5 h-5 text-neutral-400" />
                                                </button>
                                            </div>
                                            <div className="p-6 overflow-y-auto flex-1 space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                        <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Date Placed</p>
                                                        <p className="font-medium text-white">{selectedOrder.date}</p>
                                                    </div>
                                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                        <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Status</p>
                                                        <span className="px-2 py-1 inline-block rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mt-1">{selectedOrder.status}</span>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Items Included</h4>
                                                    <div className="space-y-4">
                                                        {selectedOrder.products?.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 items-center">
                                                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-white/5" />
                                                                <div className="flex-1">
                                                                    <p className="font-bold text-white">{item.name}</p>
                                                                    <p className="text-sm text-neutral-400">Qty: {item.quantity}</p>
                                                                </div>
                                                                <p className="font-bold text-accent">₦{(item.price * item.quantity).toLocaleString()}</p>
                                                            </div>
                                                        )) || (
                                                            <p className="text-neutral-500 text-sm">Legacy order (no item details stored during checkout phase before 1.2 update).</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
                                                <span className="font-bold text-neutral-400">Total Paid</span>
                                                <span className="text-2xl font-bold text-emerald-400">₦{selectedOrder.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </>
                            )}

                            {activeTab === 'messages' && (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-neutral-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Inbox Empty</h3>
                                    <p className="text-neutral-400">You have no new messages from support or sellers.</p>
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <History className="w-8 h-8 text-neutral-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">History Empty</h3>
                                    <p className="text-neutral-400">Products you view will appear here so you can find them easily later.</p>
                                </div>
                            )}

                            {activeTab === 'coupons' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Your Offers</h3>
                                    
                                    <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/20 to-transparent border border-accent/30 flex items-center justify-between">
                                        <div>
                                            <div className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest rounded mb-2">New User</div>
                                            <h4 className="text-xl font-bold text-white mb-1">10% Off Your First Order</h4>
                                            <p className="text-neutral-400 text-sm">Valid until the end of the month.</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-accent mb-2">WELCOME10</div>
                                            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors">
                                                Copy Code
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="inline-block px-2 py-1 bg-neutral-500/20 text-neutral-300 text-xs font-bold uppercase tracking-widest rounded mb-2">Shipping</div>
                                            <h4 className="text-xl font-bold text-white mb-1">Free Expedited Shipping</h4>
                                            <p className="text-neutral-400 text-sm">On orders over ₦750,000.</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white mb-2">Automatically Applied</div>
                                            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors">
                                                Shop Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
