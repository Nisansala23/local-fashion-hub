"use client";

import { useCartStore } from "@/store/userCartStore";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        imageUrl?: string | null;
        fallbackImageUrl?: string | null;
        slug: string;
    };
    quantity?: number;
}

export default function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || product.fallbackImageUrl || "",
            slug: product.slug,
            quantity: quantity, // 🚀 FIX: Pass the dynamic quantity INSIDE the product object!
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            suppressHydrationWarning
            className={`flex-1 py-3 font-medium text-sm rounded-md flex items-center justify-center gap-2 transition shadow-sm ${product.stock > 0
                    ? "bg-[#24523e] text-white hover:bg-[#1a3d2e] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
        >
            <ShoppingCart size={16} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
    );
}