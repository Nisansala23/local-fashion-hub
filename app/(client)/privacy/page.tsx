export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-16 space-y-6 bg-white">
            <h1 className="text-2xl font-black text-shop-dark uppercase tracking-tight">Privacy Policy</h1>
            <div className="w-12 h-[2px] bg-shop-orange" />
            <p className="text-xs text-shop-gray-dark font-light leading-relaxed">
                At Bazaar, your data integrity is paramount. This policy outlines how we handle information gathered across checkout operations, authentication systems, and browsing interactions.
            </p>
            <h3 className="text-xs font-bold text-shop-dark uppercase tracking-wider pt-2">Data Processing</h3>
            <p className="text-xs text-shop-gray-dark font-light leading-relaxed">
                We collect identity profiles processed via secure Clerk portals and transaction parameters transmitted safely over encrypted Stripe gateways. We never swap, trade, or distribute your private usage parameters to third-party marketplaces.
            </p>
        </main>
    );
}