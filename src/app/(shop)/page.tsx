import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    const featuredProducts = products.filter((p) => p.featured);

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-background">
                    <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs font-medium text-accent">New Collection 2024</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-500">
                            Next Gen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                                Technology
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-400 max-w-lg">
                            Explore the future with our curated collection of cutting-edge gadgets and accessories. Designed for the modern innovator.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/shop"
                                className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold flex items-center gap-2 hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
                            >
                                Shop Now <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/about"
                                className="px-8 py-4 rounded-full bg-neutral-100 text-accent font-bold border border-white/10 hover:bg-white/10 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full hidden md:block">
                        {/* Hero Image / Composition */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-30" />
                        <img
                            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000"
                            alt="Hero Gadget"
                            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-slide-up"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-accent mb-2">Featured Drops</h2>
                        <p className="text-neutral-400">Hand-picked gear for your setup.</p>
                    </div>
                    <Link href="/shop" className="text-accent hover:text-accent/80 flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Bento Grid / Categories Highligth could go here */}
            <section className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                    <div className="md:col-span-2 relative rounded-3xl overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="VR" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <div>
                                <h3 className="text-2xl font-bold text-accent mb-2">Virtual Reality</h3>
                                <p className="text-neutral-300">Immerse yourself in new worlds.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden group bg-neutral-900 border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-neutral-700 font-bold text-8xl opacity-20">AUDIO</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" alt="Audio" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <div>
                                <h3 className="text-xl font-bold text-white">Premium Audio</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
