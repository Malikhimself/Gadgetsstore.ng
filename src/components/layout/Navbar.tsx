"use client";

import { ShoppingCart, Menu, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/categories", label: "Categories" },
        { href: "/about", label: "About" }
    ];

    const visibleLinks = navLinks.filter(link => link.href !== pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-muted-foreground flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                        G
                    </span>
                    Gadgets
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {visibleLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-0 w-4 h-4 bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-4">
                            <Link href="/profile" className="text-sm text-muted-foreground hover:text-white transition-colors">
                                Hi, <span className="font-medium text-white">{user.name}</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-red-400 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                            <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/5 transition-colors">
                                Login
                            </Link>
                            <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <button
                        className="md:hidden p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-white/5 bg-background absolute w-full p-4 flex flex-col gap-4 shadow-xl">
                    {visibleLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link href="/profile" className="text-sm text-white px-2 hover:text-accent transition-colors">
                                    Signed in as <span className="font-medium">{user.name}</span>
                                </Link>
                                <button onClick={logout} className="text-left px-2 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2">
                                    Login
                                </Link>
                                <Link href="/signup" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
