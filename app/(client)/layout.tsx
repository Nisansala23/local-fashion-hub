import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Responsive shopping navigation headers */}
            <Header />
            <CartDrawer />

            {/* Main client page content frame */}
            <main className="flex-grow bg-white">
                {children}
            </main>

            {/* Global storefront footer layout template */}
            <Footer />
        </div>
    );
}