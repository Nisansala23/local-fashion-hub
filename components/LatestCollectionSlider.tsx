"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    slug: string;
    category?: { title: string };
}

interface Props {
    products: Product[];
}

export default function LatestCollectionSlider({ products }: Props) {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Handles smooth horizontal scroll math on arrow click
    const handleScroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const scrollAmount = clientWidth * 0.75; // Scrolls 75% of view width per click

            sliderRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="space-y-6">
            {/* 1. Header Row: Title on left, Action arrows on the right */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">
                        Our Latest Collections
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-light">
                        Explore premium items pulled directly from your live database catalog.
                    </p>
                </div>

                {/* Navigation Arrow Elements */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleScroll("left")}
                        className="p-2 border border-gray-200 rounded-full bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleScroll("right")}
                        className="p-2 border border-gray-200 rounded-full bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 2. Interactive Horizontal Scrolling Viewport */}
            <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            >
                {products?.map((product) => (
                    <div
                        key={product._id}
                        className="w-[280px] sm:w-[300px] flex-shrink-0 snap-start group border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
                    >
                        {/* Product Image Area */}
                        <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
                            {product.imageUrl && (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    unoptimized // Safe bypass to guarantee massive lookbook images don't freeze local servers
                                    className="object-contain p-6 transform transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 300px"
                                />
                            )}
                        </div>

                        {/* Product Info / Details */}
                        <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                                    {product.category?.title || "Featured Item"}
                                </span>
                                <Link href={`/product/${product.slug}`} className="block">
                                    <h3 className="text-sm font-semibold text-gray-900 transition hover:text-[#24523e] truncate">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-sm font-bold text-gray-900 pt-1">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>

                            {/* PREMIUM RE-DESIGNED ACTION: View Details Button */}
                            <Link
                                href={`/product/${product.slug}`}
                                className="w-full py-2.5 text-xs font-semibold text-center rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all flex items-center justify-center gap-2 shadow-2xs mt-2"
                            >
                                <Eye size={14} className="text-gray-400 group-hover:text-gray-600" />
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}