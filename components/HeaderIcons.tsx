"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "../store/userCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function HeaderIcons() {
    const cart = useCartStore((state) => state.cart);
    const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
    const wishlist = useWishlistStore((state) => state.wishlist) || [];

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalWishlistItems = wishlist.length;

    return (
        <div className="flex items-center justify-end gap-5 w-auto md:w-1/3">

            {/* 🔍 Search Trigger Button Element */}
            <button
                suppressHydrationWarning
                className="text-shop-dark hover:text-emerald-500 transition-colors duration-200 cursor-pointer p-1"
            >
                <Search className="w-5 h-5" />
            </button>

            {/* 🤍 Wishlist Route Navigation Link */}
            <Link href="/wishlist" className="relative p-1 block group">
                <Heart
                    className="w-5 h-5 text-shop-dark group-hover:text-emerald-500 transition-colors duration-200"
                />

                {/* Notification Badge matching the design frame styling rules */}
                {isMounted && totalWishlistItems > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-[#24523e] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center pointer-events-none">
                        {totalWishlistItems}
                    </span>
                )}
            </Link>

            {/* 🛍️ Shopping Bag Drawer Toggle Controller Element */}
            <button
                onClick={() => setIsCartOpen(true)}
                suppressHydrationWarning
                className="relative bg-transparent border-0 p-1 outline-hidden cursor-pointer group"
            >
                <ShoppingBag className="w-5 h-5 text-shop-dark group-hover:text-emerald-500 transition-colors duration-200" />

                {/* Real-time quantity counter badge protected by client-side mount state */}
                {isMounted && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-[#24523e] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center pointer-events-none animate-pulse">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>
    );
}