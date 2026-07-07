"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface WishlistCardButtonProps {
    product: {
        _id: string;
        name: string;
        price: number;
        imageUrl: string | null;
        slug: string;
    };
}

export default function WishlistCardButton({ product }: WishlistCardButtonProps) {
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const wishlist = useWishlistStore((state) => state.wishlist) || [];
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Safeguard the snapshot matching logic against hydration flashes
    const isWishlisted = isMounted && wishlist.some(
        (item) => item?._id === product?._id || String(item?._id) === String(product?._id)
    );

    return (
        <button
            onClick={(e) => {
                e.preventDefault(); // 🛑 CRITICAL: Stops the click from triggering the parent card's <Link>
                e.stopPropagation(); // 🛑 CRITICAL: Stops event bubbling up to the card wrapper
                toggleWishlist(product);
            }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-xs border border-gray-100 transition-all duration-300 hover:scale-110 hover:bg-white cursor-pointer z-20 group/heart"
            aria-label="Add to wishlist"
        >
            <Heart
                size={16}
                className={
                    isWishlisted
                        ? "fill-[#24523e] text-[#24523e]"
                        : "text-gray-600 transition-colors duration-200 group-hover/heart:text-[#24523e]"
                }
            />
        </button>
    );
}