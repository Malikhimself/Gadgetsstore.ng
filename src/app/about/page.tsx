"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 overflow-hidden">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-20 text-center relative max-w-5xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-accent/20 rounded-full blur-[120px] -z-10" />
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 mt-8">
                        <span className="text-xs font-medium text-accent uppercase tracking-wider">Our Story</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Redefining the <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                            Future of Tech
                        </span>
                    </h1>
                    
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl">
                        At Gadgets Store, we don't just sell electronics. We curate the most advanced, premium technology on the planet, making the future accessible to everyone.
                    </p>
                </section>

                {/* Split Intro Section */}
                <section className="container mx-auto px-4 mb-20 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-12 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                            <ShieldCheck className="w-12 h-12 text-accent mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-4">Uncompromising Quality</h2>
                            <p className="text-neutral-400 leading-relaxed font-medium">
                                Every single product in our catalog goes through an intense vetting process. Whether it's the latest flagship smartphone, an 8K OLED TV, or an immersive VR headset, we only partner with brands that share our exact obsession with quality and sleek design.
                            </p>
                        </div>
                        <div className="relative h-80 md:h-auto rounded-3xl overflow-hidden glass border border-white/10 hover:border-accent/30 transition-colors">
                            <img 
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                                alt="Quality Tech Board" 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 mb-20 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Core Pillars</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all">
                            <Zap className="w-10 h-10 text-accent mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">Innovation First</h3>
                            <p className="text-neutral-400">We source gear that pushes boundaries. If it's not state-of-the-art machinery, it simply doesn't make it to our storefront.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                            <Globe className="w-10 h-10 text-blue-500 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">Global Accessibility</h3>
                            <p className="text-neutral-400">Tech is a universal language carefully spoken globally. We ship securely to over 50 countries with tracked delivery.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all">
                            <div className="w-10 h-10 rounded-full border-4 border-dashed border-accent mb-6 flex items-center justify-center" />
                            <h3 className="text-xl font-bold text-white mb-2">Easy Financing</h3>
                            <p className="text-neutral-400">Premium tech shouldn't break the bank. Our 50% down-payment BNPL system democratizes access to elite electronics seamlessly.</p>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="container mx-auto px-4 text-center max-w-6xl">
                    <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-tr from-accent/20 via-background to-blue-500/10 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#09090b]/80 group-hover:bg-[#09090b]/60 transition-colors z-0" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to upgrade?</h2>
                            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                                Join thousands of early adopters, gamers, and professionals who trust us for their hardware needs. Experience computing exactly how it was designed to be experienced.
                            </p>
                            <Link 
                                href="/shop" 
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                            >
                                Shop the Collection <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
