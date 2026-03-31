"use client";

import { useState } from "react";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "block w-full text-left px-4 py-2 rounded-lg transition-colors",
                                        selectedCategory === category
                                            ? "bg-accent text-accent-foreground font-medium"
                                            : "text-neutral-400 hover:text-white hover:bg-accent"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Price Range</h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-neutral-400 mb-2">Coming soon...</p>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-neutral ">{selectedCategory}</h1>
                        <span className="text-neutral-400">{filteredProducts.length} Results</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-neutral-400 text-lg">No products found in this category.</p>
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className="mt-4 text-accent hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
