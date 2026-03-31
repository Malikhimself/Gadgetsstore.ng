import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";

const categoryImages: Record<string, string> = {
    "Smartphones": "https://images.unsplash.com/photo-1759588071804-1a8aef4a841d?auto=format&fit=crop&q=80&w=800",
    "PCs": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
    "TVs": "https://images.unsplash.com/photo-1643568637814-a45236bc864a?auto=format&fit=crop&q=80&w=800",
    "Drones": "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800",
    "Watches": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    "Audio": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    "Gaming": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
    "Smart Home": "https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&q=80&w=800"
};

export default function CategoriesPage() {
    // Filter out "All" as it's not a specific product category visually
    const displayCategories = categories.filter(c => c !== "All");

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20">
            {/* Header */}
            <section className="container mx-auto px-4 mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">Explore By Category</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 mt-4">
                    Find Your Next <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                        Obsession
                    </span>
                </h1>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                    Browse our curated collection of premium tech across various categories. Find exactly what you're looking for to upgrade your setup.
                </p>
            </section>

            {/* Categories Grid */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayCategories.map((category) => (
                        <Link 
                            key={category} 
                            href={`/shop?category=${encodeURIComponent(category)}`}
                            className="group relative h-80 rounded-3xl overflow-hidden bg-white/5 border border-white/10 block hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                        >
                            <img 
                                src={categoryImages[category]} 
                                alt={category} 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                                    <div className="flex items-center text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        Shop {category} <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
        </>
    );
}
