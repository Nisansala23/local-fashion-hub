"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/userCartStore";
import { motion } from "framer-motion";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const { clearCart } = useCartStore();

    // Extract the orderNumber string query variable directly from the URL parameter strings
    const orderNumber = searchParams.get("orderNumber") || "N/A";

    // 🚀 CRITICAL UI WORKFLOW: Clear the global Zustand cart state automatically 
    // on mount so their bag resets back to 0 items after a successful payment!
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="w-full bg-[#f8fafc] py-16 px-4 flex items-center justify-center min-h-[85vh]">

            {/* Main Floating Order Confirmed Card Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 max-w-xl w-full text-center flex flex-col items-center justify-center relative"
            >

                {/* Animated Checkmark Circle Icon Pod */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-md"
                >
                    <Check className="w-8 h-8 text-white stroke-[3]" />
                </motion.div>

                {/* Heading Typography Content */}
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-md mb-6">
                    Thank you for your purchase. We're processing your order and will ship it soon.
                    A confirmation email with your order details will be sent to your inbox shortly.
                </p>

                {/* Extracted Dynamic Order Number Value Tracker Block */}
                <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs">
                    <span className="text-gray-400 font-medium">Order Number:</span>
                    <span className="font-mono font-bold text-gray-800 break-all select-all">
                        {orderNumber}
                    </span>
                </div>

                {/* "What's Next?" Nested Informational Panel */}
                <div className="w-full border border-gray-100 rounded-xl p-5 mb-8 text-center space-y-2.5 bg-white">
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        What's Next?
                    </h3>
                    <div className="text-xs text-gray-400 font-medium space-y-1">
                        <p>Check your email for order confirmation</p>
                        <p>We'll notify you when your order ships</p>
                        <p>Track your order status anytime</p>
                    </div>
                </div>

                {/* Bottom Navigation Control Action Hub Row */}
                <div className="w-full space-y-3">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Recent Orders
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition shadow-xs"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>

                        {/* Orders Dashboard Link */}
                        <Link
                            href="/orders"
                            className="flex items-center justify-center gap-2 bg-[#94d3a2] hover:bg-[#7bc28c] text-gray-900 text-xs font-bold py-3.5 px-4 rounded-xl transition shadow-xs"
                        >
                            <Package className="w-4 h-4" />
                            <span>Orders</span>
                        </Link>

                        {/* Back to Shopping Store Link */}
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition shadow-xs"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Shop</span>
                        </Link>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}