"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, Minus, Plus } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { useState, useEffect } from "react";

interface ProductQuickActionsProps {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        imageUrl: string | null;
        slug: string;
    };
}

export default function ProductQuickActions({ product }: ProductQuickActionsProps) {
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [quantity, setQuantity] = useState<number>(1); // 🚀 NEW: Tracks selected item count
    const [isMounted, setIsMounted] = useState(false);

    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const wishlist = useWishlistStore((state) => state.wishlist) || [];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isWishlisted = isMounted && wishlist.some(
        (item) => item?._id === product?._id || String(item?._id) === String(product?._id)
    );

    const sizeOptions = ["S", "M", "L", "XL"];

    // Dynamic control handlers for quantity boundary limits
    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleIncrease = () => {
        if (quantity < product.stock) setQuantity((prev) => prev + 1);
    };

    return (
        <div className="space-y-6 pt-2">
            {/* 1. Apparel Size Variant Selection */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select Size</span>
                    <span className="text-xs font-medium text-gray-400">Active Option: {selectedSize}</span>
                </div>
                <div className="flex gap-2.5">
                    {sizeOptions.map((size) => (
                        <button
                            key={size}
                            onClick={() => {
                                setSelectedSize(size);
                                setQuantity(1); // Reset counter if they swap sizes
                            }}
                            className={`w-11 h-11 text-xs font-bold rounded-md border flex items-center justify-center transition-all cursor-pointer ${selectedSize === size
                                    ? "border-[#24523e] bg-[#24523e] text-white shadow-xs"
                                    : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. 🚀 NEW: Quantity Counter Block Node */}
            <div className="space-y-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-lg w-max bg-white h-11 overflow-hidden shadow-2xs">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1 || product.stock === 0}
                        className="px-4 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="px-2 font-bold text-sm text-gray-900 w-12 text-center select-none">
                        {product.stock === 0 ? 0 : quantity}
                    </span>

                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= product.stock || product.stock === 0}
                        className="px-4 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                {product.stock > 0 && (
                    <p className="text-[10px] text-gray-400 font-medium">
                        Only {product.stock} items available in global warehouse inventory.
                    </p>
                )}
            </div>

            {/* 3. Main Action Line Matrix */}
            <div className="flex gap-3 pt-2">
                {/* Passes both product items and the target quantity state down */}
                <AddToCartButton
                    quantity={quantity} // 👈 FORWARD QUANTITY PROP
                    product={{
                        _id: product._id,
                        name: `${product.name} (${selectedSize})`,
                        price: product.price,
                        stock: product.stock,
                        imageUrl: product.imageUrl,
                        slug: product.slug,
                    }}
                />

                <button
                    onClick={() => {
                        toggleWishlist({
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl,
                            slug: product.slug
                        });
                    }}
                    className={`p-3 border rounded-md transition-all duration-200 cursor-pointer ${isWishlisted
                            ? "border-[#24523e]/30 bg-[#24523e]/5 text-[#24523e] scale-105"
                            : "border-gray-200 text-gray-500 hover:text-[#24523e] hover:bg-gray-50"
                        }`}
                >
                    <Heart
                        size={18}
                        className={isWishlisted ? "fill-[#24523e] text-[#24523e]" : "transition-colors"}
                    />
                </button>
            </div>
        </div>
    );
}