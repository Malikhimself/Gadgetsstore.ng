"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items: cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <p className="text-neutral-400 mb-8">Looks like you haven't added any gadgets yet.</p>
                <Link href="/shop" className="inline-block px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 items-center">
                            <div className="h-24 w-24 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{item.name}</h3>
                                        <p className="text-sm text-neutral-400">{item.category}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-neutral-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:bg-white/10 rounded-md text-white transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-white font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:bg-white/10 rounded-md text-white transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="font-bold text-white text-lg">₦{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6 sticky top-24">
                        <h2 className="text-xl font-bold text-white">Order Summary</h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-neutral-400">
                                <span>Subtotal</span>
                                <span className="text-white">₦{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-neutral-400">
                                <span>Tax (10%)</span>
                                <span className="text-white">₦{tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-neutral-400">
                                <span>Shipping</span>
                                <span className="text-emerald-400">Free</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between font-bold text-lg text-white">
                                <span>Total</span>
                                <span>₦{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold flex items-center justify-center gap-2 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Proceed to Checkout <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
