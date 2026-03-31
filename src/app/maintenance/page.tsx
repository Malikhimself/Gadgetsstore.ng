import { Wrench, Clock, Mail } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
            {/* Background glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="relative z-10 text-center max-w-lg">
                {/* Icon */}
                <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8">
                    <Wrench className="w-12 h-12 text-accent" />
                </div>

                <h1 className="text-5xl font-bold text-white mb-4">
                    Under Maintenance
                </h1>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                    We're upgrading our store to serve you better. We'll be back online shortly — thanks for your patience!
                </p>

                {/* Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-10">
                    <Clock className="w-4 h-4" />
                    <span>Expected downtime: a few minutes</span>
                </div>

                {/* Contact */}
                <a
                    href="mailto:support@gadgetsstore.ng"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white transition-all font-medium"
                >
                    <Mail className="w-4 h-4" />
                    Contact Support
                </a>

                <p className="mt-8 text-xs text-neutral-700">
                    Gadgets Store &middot; Lagos, Nigeria
                </p>
            </div>
        </div>
    );
}
