"use client";

import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowLeft, ShoppingCart, Star, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, notFound, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product);
        router.push("/checkout");
    };

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-accent transition-colors">
                                <img src={product.image} alt="" className="object-cover w-full h-full opacity-60 hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold px-3 py-1 rounded-full bg-accent text-accent-foreground uppercase tracking-wider">
                                {product.category}
                            </span>
                            <button className="text-neutral-400 hover:text-accent transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5" />
                            </div>
                            <span className="text-neutral-400 text-sm">(128 Reviews)</span>
                        </div>

                        <p className="text-xl text-neutral-300 leading-relaxed">
                            {product.description}
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-muted-foreground">₦{product.price.toLocaleString()}</span>
                            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> In Stock
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold flex items-center justify-center gap-2 hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {isAdded ? "Added to Cart!" : "Add to Cart"}
                            </button>
                            <button 
                                onClick={handleBuyNow}
                                className="w-full py-4 rounded-xl bg-white/5 text-accent border border-white/10 font-bold hover:bg-accent hover:text-white transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <p className="text-center text-xs text-neutral-500">
                            Free shipping on orders over ₦75,000 • 30-day return policy
                        </p>
                    </div >

                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                        <div>
                            <h4 className="font-bold text-neutral-400 mb-1">Fast Delivery</h4>
                            <p className="text-xs text-neutral-400">2-3 business days delivery</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-neutral-400 mb-1">Warranty</h4>
                            <p className="text-xs text-neutral-400">1 year inclusive warranty</p>
                        </div>
                    </div>
                </div >
            </div >

            {/* Related Products */}
            {
                relatedProducts.length > 0 && (
                    <div className="pt-20 border-t border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
}
