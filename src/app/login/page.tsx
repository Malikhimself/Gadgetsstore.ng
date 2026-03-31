"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const err = await login(email, password);
        if (err) setError(err);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pb-20 pt-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-neutral-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:border-accent outline-none transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                            <input
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-neutral-600 focus:border-accent outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="rounded border-white/10 bg-white/5 text-accent focus:ring-accent" />
                            <span className="text-neutral-400 group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <Link href="#" className="text-accent hover:underline">Forgot password?</Link>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold flex items-center justify-center gap-2 hover:bg-accent/90 focus:scale-[0.98] active:scale-[0.95] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <p className="text-center mt-6 text-neutral-400">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-white font-bold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
