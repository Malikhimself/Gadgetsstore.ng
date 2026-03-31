"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    featured?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <div className="aspect-square relative overflow-hidden bg-white/5">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-neutral-500 group-hover:text-accent transition-colors truncate">
                        {product.name}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-white">
                        ₦{product.price.toLocaleString()}
                    </span>
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={cn(
                            "relative z-20 p-2 rounded-full transition-all duration-300",
                            isAdded
                                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                : "bg-white/5 hover:bg-accent hover:text-white text-neutral-400"
                        )}
                    >
                        {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" />
        </div>
    );
}
