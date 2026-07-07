export default function ContactPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-16 space-y-8 bg-white">
            <div>
                <h1 className="text-3xl font-black text-shop-dark uppercase tracking-tight">Contact Us</h1>
                <div className="w-12 h-[2px] bg-shop-orange mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-shop-gray-dark">
                <div className="space-y-4">
                    <h3 className="font-bold text-shop-dark uppercase tracking-wider text-xs">Customer Relations</h3>
                    <p>Our dedicated support capsule is live Monday through Friday, 9:00 AM — 6:00 PM.</p>
                    <p>📧 Support: <span className="text-shop-dark font-medium">support@bazaar.com</span></p>
                    <p>📞 Phone: <span className="text-shop-dark font-medium">+1 (800) 555-0199</span></p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-shop-dark uppercase tracking-wider text-xs">Headquarters</h3>
                    <p>Bazaar Apparel Group LLC</p>
                    <p>100 Fashion District Boulevard, Suite 400</p>
                    <p>New York, NY 10001</p>
                </div>
            </div>
        </main>
    );
}