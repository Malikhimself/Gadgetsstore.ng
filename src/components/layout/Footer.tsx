export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 text-sm text-neutral-400">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold mb-4">Gadgets</h3>
                    <p className="mb-4">The ultimate destination for the latest tech and gadgets.</p>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Shop</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Featured</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Connect</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center">
                <p>&copy; 2024 Gadgets Store. All rights reserved.</p>
            </div>
        </footer>
    );
}
