"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store/userCartStore";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CreditCard } from "lucide-react"; // 🚀 Added standard e-commerce UI icons

export default function CartDrawer() {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false); // 🚀 Tracks Stripe redirect state loading status

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // 🚀 NEW: Server API route invocation trigger handler
    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems: cart }),
            });

            const data = await response.json();

            if (data.url) {
                // Instantly swap window context locations over to Stripe's secure sandbox portal
                window.location.href = data.url;
            } else {
                alert(data.error || "Something went wrong establishing the checkout session.");
            }
        } catch (error) {
            console.error("Redirect link connection breakdown error:", error);
            alert("Failed to connect to the checkout service.");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted || !isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-100 overflow-hidden">
            {/* Backdrop Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sliding Sidebar Panel Wrapper */}
            <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col h-full z-50 animate-in slide-in-from-right duration-300">
                {/* Drawer Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-bold text-shop-dark tracking-tight">Shopping Bag</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-shop-gray-dark hover:text-shop-dark text-sm p-2 cursor-pointer border border-gray-100 rounded-lg flex items-center justify-center w-8 h-8 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Items Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center justify-center space-y-3">
                            <span className="text-4xl">🛒</span>
                            <p className="text-sm text-shop-gray-dark font-light">Your shopping bag is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                                <div className="relative h-16 w-16 bg-shop-gray-light rounded-lg overflow-hidden flex-shrink-0 border border-gray-100/50">
                                    {item.imageUrl && (
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            unoptimized
                                            className="object-contain p-1"
                                            sizes="64px"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-shop-dark truncate">{item.name}</h4>
                                    <p className="text-sm font-black text-shop-dark-green mt-0.5">${item.price}</p>
                                    <p className="text-xs text-shop-gray-dark mt-1 font-light">Quantity: {item.quantity}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer p-2 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Fixed Footer Calculations Panel */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-shop-gray-light/40 space-y-3">
                        <div className="flex items-center justify-between text-base font-bold text-shop-dark mb-2">
                            <span className="text-sm font-medium text-shop-gray-dark">Subtotal</span>
                            <span className="text-xl font-black text-shop-dark-green">${subtotal.toFixed(2)}</span>
                        </div>

                        <Link
                            href="/cart"
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full text-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold py-3.5 rounded-xl transition duration-200 shadow-2xs"
                        >
                            View Full Shopping Bag
                        </Link>

                        {/* 🚀 NEW: Secure Stripe Action Button Matrix Node */}
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-[#24523e] text-white hover:bg-[#1a3d2e] text-sm font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Connecting Secure Checkout...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} />
                                    Proceed to Checkout
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}