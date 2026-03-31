"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CartItem } from "./CartContext";

// Detect if Supabase is properly configured
const isSupabaseConfigured = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    return url.startsWith("https://") && !url.includes("YOUR_PROJECT_ID") && key.length > 20 && !key.includes("YOUR_");
};

interface User {
    id: string;
    name: string;
    email: string;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    items: number;
    status: string;
    products?: CartItem[];
}

interface AuthContextType {
    user: User | null;
    orders: Order[];
    addOrder: (order: Order) => Promise<void>;
    login: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string, name: string) => Promise<string | null>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Fetch orders from Supabase for a given user id
    const fetchOrders = async (userId: string) => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (!error && data) {
            setOrders(data.map((row) => ({
                id: row.id,
                date: new Date(row.created_at).toLocaleDateString(),
                total: row.total,
                items: row.item_count,
                status: row.status,
                products: row.products ?? [],
            })));
        }
    };

    useEffect(() => {
        if (!isSupabaseConfigured()) {
            // FALLBACK: use localStorage mock
            const stored = localStorage.getItem("gadgets_user");
            if (stored) {
                try { setUser(JSON.parse(stored)); } catch {}
            }
            const storedOrders = localStorage.getItem("gadgets_orders");
            if (storedOrders) {
                try { setOrders(JSON.parse(storedOrders)); } catch {}
            }
            setIsLoading(false);
            return;
        }

        // Check active Supabase session on mount
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                const u = session.user;
                const name = u.user_metadata?.name || u.email?.split("@")[0] || "User";
                setUser({ id: u.id, name, email: u.email! });
                await fetchOrders(u.id);
            }
            setIsLoading(false);
        });

        // Keep session in sync across tabs
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const u = session.user;
                const name = u.user_metadata?.name || u.email?.split("@")[0] || "User";
                setUser({ id: u.id, name, email: u.email! });
                await fetchOrders(u.id);
            } else {
                setUser(null);
                setOrders([]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<string | null> => {
        if (!isSupabaseConfigured()) {
            // FALLBACK mock login
            const mockUser = { id: Math.random().toString(36).substr(2,9), name: email.split("@")[0], email };
            setUser(mockUser);
            localStorage.setItem("gadgets_user", JSON.stringify(mockUser));
            router.push("/");
            return null;
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return error.message;
        router.push("/");
        return null;
    };

    const signUp = async (email: string, password: string, name: string): Promise<string | null> => {
        if (!isSupabaseConfigured()) {
            // FALLBACK mock signup
            const mockUser = { id: Math.random().toString(36).substr(2,9), name, email };
            setUser(mockUser);
            localStorage.setItem("gadgets_user", JSON.stringify(mockUser));
            router.push("/");
            return null;
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) return error.message;
        router.push("/");
        return null;
    };

    const logout = async () => {
        if (!isSupabaseConfigured()) {
            localStorage.removeItem("gadgets_user");
            localStorage.removeItem("gadgets_orders");
        } else {
            await supabase.auth.signOut();
        }
        setUser(null);
        setOrders([]);
        router.push("/");
    };

    const addOrder = async (order: Order) => {
        if (!user) return;

        // Optimistic update
        setOrders((prev) => [order, ...prev]);

        await supabase.from("orders").insert({
            id: order.id,
            user_id: user.id,
            total: order.total,
            item_count: order.items,
            status: order.status,
            products: order.products ?? [],
        });
    };

    return (
        <AuthContext.Provider value={{ user, orders, addOrder, login, signUp, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
