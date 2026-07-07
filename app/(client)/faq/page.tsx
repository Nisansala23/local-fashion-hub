export default function FAQPage() {
    const faqs = [
        { q: "When will my garment ship?", a: "Standard capsule orders execute within 1-2 corporate working business days. Localized delivery windows can be confirmed using your tracking dispatch codes." },
        { q: "How can I process an exchange?", a: "We support flexible standard product processing windows up to 30 days post-delivery. Items must be returned unworn with tags attached." },
        { q: "Are out-of-stock items restocked?", a: "To minimize fast-fashion waste metrics, our curated wardrobe capsules release in strictly limited volumes. Sign up for back-in-stock text alerts on individual product pages." }
    ];

    return (
        <main className="max-w-3xl mx-auto px-4 py-16 space-y-8 bg-white">
            <div>
                <h1 className="text-2xl font-black text-shop-dark uppercase tracking-tight">Frequently Asked Questions</h1>
                <div className="w-12 h-[2px] bg-shop-orange mt-2" />
            </div>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-shop-dark">{faq.q}</h3>
                        <p className="text-xs text-shop-gray-dark font-light leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}