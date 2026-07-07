"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/userCartStore";
import Container from "@/components/Container";

export default function WishlistPage() {
    const wishlist = useWishlistStore((state) => state.wishlist) || [];
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);
    const addToCart = useCartStore((state) => state.addToCart);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Container className="py-12 min-h-[60vh]">
            <div className="border-b border-gray-100 pb-5 mb-8">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
                    Your Wishlist
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Manage your bookmarked apparel items and cart transfers.
                </p>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-16 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl max-w-md mx-auto px-4">
                    <div className="text-2xl mb-2">🤍</div>
                    <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your list is empty</h2>
                    <p className="text-xs text-gray-400 mt-1">Items you bookmark will appear right here.</p>
                    <Link
                        href="/shop"
                        className="inline-block mt-4 bg-[#24523e] hover:bg-[#1a3d2e] text-white text-xs font-semibold px-5 py-2.5 rounded-md transition cursor-pointer"
                    >
                        Return to Shop
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Responsive Matrix: Enables smooth horizontal swiping on smaller screens */}
                    <div className="w-full overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-xs">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-[45%]">Image / Product</th>
                                    <th className="py-4 px-4">Category</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {wishlist.map((item) => (
                                    <tr key={item._id} className="group hover:bg-gray-50/40 transition-colors">

                                        {/* Remove Button + Image Frame + Name Combination */}
                                        <td className="py-4 px-6 flex items-center gap-4">
                                            <button
                                                onClick={() => toggleWishlist(item)}
                                                className="text-gray-400 hover:text-red-500 transition p-1 cursor-pointer"
                                                title="Remove item"
                                            >
                                                <X size={16} />
                                            </button>
                                            <Link href={`/product/${item.slug}`} className="relative w-16 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 block">
                                                {item.imageUrl ? (
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        fill
                                                        sizes="80px"
                                                        className="object-contain p-2"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300">No Image</div>
                                                )}
                                            </Link>
                                            <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-[#24523e] transition line-clamp-2 max-w-xs">
                                                {item.name}
                                            </Link>
                                        </td>

                                        {/* Category Info Node */}
                                        <td className="py-4 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Apparel Item
                                        </td>

                                        {/* Stock Availability Node */}
                                        <td className="py-4 px-4">
                                            <span className="inline-flex text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                                In Stock
                                            </span>
                                        </td>

                                        {/* Price Flag */}
                                        <td className="py-4 px-4 font-bold text-gray-900">
                                            ${item.price.toFixed(2)}
                                        </td>

                                        {/* Dynamic Cart Push Action Input */}
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => {
                                                    addToCart({
                                                        _id: item._id,
                                                        name: item.name,
                                                        price: item.price,
                                                        imageUrl: item.imageUrl || "",
                                                        slug: item.slug,
                                                    });
                                                }}
                                                className="inline-flex items-center gap-1.5 bg-[#24523e] hover:bg-[#1a3d2e] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-2xs cursor-pointer ml-auto"
                                            >
                                                <ShoppingCart size={13} />
                                                Add to Cart
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Lower Global Control Row: Houses the Clear All Action Trigger */}
                    <div className="flex justify-start pt-2">
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to reset your favorites?")) {
                                    clearWishlist();
                                }
                            }}
                            className="px-5 py-2.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-700 hover:text-red-600 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-2xs"
                        >
                            Reset Favorite
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
}