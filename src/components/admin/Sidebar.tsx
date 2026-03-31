"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-black border-r border-white/10 h-screen fixed left-0 top-0 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-10 text-white font-bold text-xl">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground text-sm">
                    A
                </span>
                Admin
            </div>

            <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </aside>
    );
}
