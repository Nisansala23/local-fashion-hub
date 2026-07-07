export default function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-16 space-y-6 bg-white">
            <h1 className="text-2xl font-black text-shop-dark uppercase tracking-tight">Terms & Conditions</h1>
            <div className="w-12 h-[2px] bg-shop-orange" />
            <p className="text-xs text-shop-gray-dark font-light leading-relaxed">
                Welcome to Bazaar. By accessing or using our digital storefront, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>
            <h3 className="text-xs font-bold text-shop-dark uppercase tracking-wider pt-2">1. User Accounts</h3>
            <p className="text-xs text-shop-gray-dark font-light leading-relaxed">
                When creating an account via our Clerk authentication protocols, you agree to provide accurate, complete information. You are solely responsible for protecting your session security parameters.
            </p>
            <h3 className="text-xs font-bold text-shop-dark uppercase tracking-wider pt-2">2. Inventory Pricing & Adjustments</h3>
            <p className="text-xs text-shop-gray-dark font-light leading-relaxed">
                We reserve the right to alter pricing configurations, adjust promotional discounts, or cancel inventory orders matching systemic data or pricing failures without prior liability.
            </p>
        </main>
    );
}