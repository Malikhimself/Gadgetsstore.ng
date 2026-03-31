"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { usePaystackPayment } from "react-paystack";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'installments'>('card');
    const [installmentProvider, setInstallmentProvider] = useState<'paystack' | 'flutterwave' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { items, subtotal, clearCart, totalItems } = useCart();
    const { user, addOrder } = useAuth();

    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 15 : 0;
    const total = subtotal + tax + shipping;
    const downPayment = total * 0.5;

    const paystackConfig = {
        reference: (new Date()).getTime().toString(),
        email: user?.email || "guest@gadgetsstore.com",
        amount: Math.round(downPayment * 100), // Kobo formatted
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    };

    const sendConfirmationEmail = async () => {
        try {
            await fetch('/api/checkout/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user?.email || "guest@gadgetsstore.com",
                    name: user?.name,
                    total: total,
                    items: totalItems || 1,
                    date: new Date().toLocaleDateString()
                })
            });
        } catch (error) {
            console.error("Failed to trigger email", error);
        }
    };

    const finalizeOrder = () => {
        addOrder({
            id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            date: new Date().toLocaleDateString(),
            total,
            items: totalItems || 1,
            status: "Processing",
            products: items
        });
        sendConfirmationEmail();
        setIsProcessing(false);
        setStep(3);
        clearCart();
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get("step") === "3") {
                setStep(3);
                clearCart();
            }
        }
    }, [clearCart]);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            setIsProcessing(true);
            
            if (paymentMethod === 'installments' && installmentProvider) {
                if (installmentProvider === 'paystack') {
                    initializePaystack({
                        onSuccess: () => {
                            finalizeOrder();
                        },
                        onClose: () => {
                            setIsProcessing(false);
                        }
                    });
                    return;
                }
                
                // Simulate gateway redirect and processing time for other providers
                setTimeout(() => {
                    finalizeOrder();
                }, 2000);
                return;
            }
            
            // Standard flow
            setTimeout(() => {
                finalizeOrder();
            }, 1500);
        }
    };
    const monthlyPayment = (total * 0.5) / 4;

    if (step === 3) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-lg">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
                <p className="text-neutral-400 mb-8">
                    Thank you for your purchase. We have sent a confirmation email to your inbox.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-20 max-w-4xl">
            <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

                    <div className="flex gap-4 mb-8">
                        <div className={cn("h-1 flex-1 rounded-full", step >= 1 ? "bg-accent" : "bg-white/10")} />
                        <div className={cn("h-1 flex-1 rounded-full", step >= 2 ? "bg-accent" : "bg-white/10")} />
                    </div>

                    <form className="space-y-6" onSubmit={handleCheckout}>
                        {step === 1 ? (
                            <>
                                <h2 className="text-xl font-bold text-white mb-4">Shipping Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm text-neutral-400 mb-2">First Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="John" required />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm text-neutral-400 mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="Doe" required />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-neutral-400 mb-2">Email</label>
                                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="john@example.com" required />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-neutral-400 mb-2">Address</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="123 Tech St" required />
                                    </div>
                                </div>
                                <div className="mt-8 space-y-4">
                                    <button 
                                        type="submit" 
                                        disabled={isProcessing}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? "Processing Payment..." : `Pay ₦${total.toLocaleString()}`} <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                    <p className="text-center text-xs text-neutral-500">
                                        Your payment information is securely encrypted.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>

                                {/* Payment Selection */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={cn(
                                            "p-4 rounded-xl border text-center transition-all",
                                            paymentMethod === 'card'
                                                ? "bg-accent/10 border-accent/50 text-white"
                                                : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                                        )}
                                    >
                                        <span className="font-bold block tracking-wider uppercase text-sm mb-1">Standard</span>
                                        <span className="font-medium block text-sm">Credit Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('installments')}
                                        className={cn(
                                            "p-4 rounded-xl border text-center transition-all",
                                            paymentMethod === 'installments'
                                                ? "bg-accent/10 border-accent/50 text-white"
                                                : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                                        )}
                                    >
                                        <span className="font-bold block tracking-wider uppercase text-sm mb-1 text-accent">Easy-Buy</span>
                                        <span className="font-medium block text-sm">50% Down, 4 Mo</span>
                                    </button>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="space-y-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm text-neutral-400 mb-2">Card Number</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="0000 0000 0000 0000" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-neutral-400 mb-2">Expiry</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="MM/YY" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-neutral-400 mb-2">CVC</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="123" required />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold mt-6 hover:bg-accent/90 transition-colors">
                                            Pay Now
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-center">
                                        <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                                            <h3 className="text-lg font-bold text-white mb-2">50% Down Today</h3>
                                            <div className="text-3xl font-bold text-accent mb-4">₦{downPayment.toLocaleString()}</div>
                                            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
                                                <span className="text-neutral-400">Monthly Installment</span>
                                                <span className="font-bold text-white">₦{monthlyPayment.toLocaleString()} / mo</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-left mt-8">
                                            <h4 className="font-bold text-white border-b border-white/10 pb-2">Identity Verification</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-neutral-400 mb-2">ID Type</label>
                                                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors appearance-none" required defaultValue="">
                                                        <option value="" disabled className="">Select ID</option>
                                                        <option value="passport" className="bg-[#18181b]">Passport</option>
                                                        <option value="driver_license" className="bg-[#18181b]">Driver's License</option>
                                                        <option value="national_id" className="bg-[#18181b]">National ID</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-neutral-400 mb-2">ID Number</label>
                                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors" placeholder="Enter ID Number" required />
                                                </div>
                                            </div>

                                            <h4 className="font-bold text-white border-b border-white/10 pb-2 pt-4">Select Nigerian Gateway</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setInstallmentProvider('paystack')}
                                                    className={cn(
                                                        "p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2",
                                                        installmentProvider === 'paystack' ? "bg-[#0BA4DB]/10 border-[#0BA4DB] text-white" : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                                                    )}
                                                >
                                                    <span className="font-bold tracking-tight text-[#0BA4DB]">Paystack</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setInstallmentProvider('flutterwave')}
                                                    className={cn(
                                                        "p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2",
                                                        installmentProvider === 'flutterwave' ? "bg-[#F5A623]/10 border-[#F5A623] text-white" : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                                                    )}
                                                >
                                                    <span className="font-bold tracking-tight text-[#F5A623]">Flutterwave</span>
                                                </button>
                                            </div>
                                            {installmentProvider === 'paystack' && <p className="text-xs text-[#0BA4DB] mt-2 border border-[#0BA4DB]/20 bg-[#0BA4DB]/5 p-2 rounded-lg">You will be securely redirected to Paystack to complete your 50% down payment.</p>}
                                            {installmentProvider === 'flutterwave' && <p className="text-xs text-[#F5A623] mt-2 border border-[#F5A623]/20 bg-[#F5A623]/5 p-2 rounded-lg">You will be securely redirected to Flutterwave to complete your 50% down payment.</p>}
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={!installmentProvider || isProcessing}
                                            className={cn(
                                                "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold mt-8 transition-colors",
                                                !installmentProvider || isProcessing ? "bg-white/10 text-neutral-500 cursor-not-allowed" : "bg-white text-black hover:bg-neutral-200"
                                            )}
                                        >
                                            {isProcessing 
                                                ? `Connecting to ${installmentProvider?.charAt(0).toUpperCase() + installmentProvider?.slice(1)!}...` 
                                                : installmentProvider 
                                                    ? `Continue to ${installmentProvider.charAt(0).toUpperCase() + installmentProvider.slice(1)}` 
                                                    : "Select a Provider"
                                            } <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </form>
                </div>

                {/* Mini Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit text-white">
                    <h3 className="font-bold mb-4">Order Summary</h3>
                    <div className="space-y-4 text-sm mt-8 pb-8 border-b border-white/10">
                        <div className="flex justify-between text-neutral-400">
                            <span>Subtotal</span>
                            <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                            <span>Tax (8%)</span>
                            <span className="font-medium">₦{tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                            <span>Shipping</span>
                            <span className="font-medium">₦{shipping.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-8">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="font-bold text-xl text-accent">₦{total.toLocaleString()}</span>
                    </div>
                    {paymentMethod === 'installments' && (
                        <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                            <p className="text-sm font-bold text-accent text-center mb-1">
                                Down Payment: ₦{(total * 0.5).toLocaleString()}
                            </p>
                            <p className="text-xs text-neutral-400 text-center">
                                + 4 payments of ₦{(total * 0.125).toLocaleString()}/mo
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
