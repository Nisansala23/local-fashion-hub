"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Eye } from "lucide-react";
import WishlistCardButton from "@/components/WishlistCardButton"; // 👈 Import the floating component

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        images: any[];
        slug: { current: string };
        categoryTitle?: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    // Get the first image URL from Sanity, or fallback to a placeholder
    const displayImageUrl = product.images && product.images.length > 0
        ? urlFor(product.images[0]).url()
        : null;

    return (
        <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">

            {/* Image Frame Wrapper (Acting as the relative layout host frame) */}
            <div className="w-full aspect-[4/5] bg-gray-50 relative overflow-hidden block">

                {/* 🚀 FLOATING HEART BUTTON: Placed safely outside the <Link> routing line */}
                <WishlistCardButton
                    product={{
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        imageUrl: displayImageUrl,
                        slug: product.slug.current
                    }}
                />

                {/* Main Navigational Route Container Wrapper */}
                <Link
                    href={`/product/${product.slug.current}`}
                    className="w-full h-full block"
                >
                    {displayImageUrl ? (
                        <Image
                            src={displayImageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-contain p-6 transform transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-light">
                            No Preview Available
                        </div>
                    )}

                    {/* Subtle Out of Stock Overlay Indicator */}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 border border-gray-300 px-3 py-1.5 rounded-md bg-white">
                                Sold Out
                            </span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Product Meta Content Layer */}
            <div className="p-5 flex flex-col flex-1 space-y-2.5">
                <div className="space-y-1">
                    {/* Category Label */}
                    {product.categoryTitle && (
                        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block">
                            {product.categoryTitle}
                        </span>
                    )}

                    {/* Product Name Link */}
                    <Link href={`/product/${product.slug.current}`} className="block">
                        <h3 className="text-sm font-semibold text-gray-900 transition hover:text-[#24523e] line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Pricing & Grid Align Base */}
                <div className="flex items-center justify-between pt-1 mt-auto">
                    <span className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-[10px] font-medium ${product.stock > 0 ? "text-emerald-600" : "text-gray-400"}`}>
                        {product.stock > 0 ? `${product.stock} left` : "Restocking"}
                    </span>
                </div>

                {/* View Details Button Navigation (Kept exactly the same) */}
                <Link
                    href={`/product/${product.slug.current}`}
                    className="w-full py-2.5 text-xs font-semibold text-center rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                    <Eye size={14} className="text-gray-400 group-hover:text-gray-600" />
                    View Details
                </Link>
            </div>
        </div>
    );
}