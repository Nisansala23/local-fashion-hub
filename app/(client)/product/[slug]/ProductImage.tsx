"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Imported arrow icons

interface ProductImageProps {
    imageUrls: string[];
    productName: string;
}

export default function ProductImage({ imageUrls, productName }: ProductImageProps) {
    // 1. Keep track of which thumbnail is currently selected
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Fallback placeholder if the product doesn't have any images in Sanity
    if (!imageUrls || imageUrls.length === 0) {
        return (
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                No image available
            </div>
        );
    }

    // Interactive scroll actions for the arrows
    const handlePrev = () => {
        setActiveImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Feature Image Window (added "group" to listen for hovers) */}
            <div className="w-full aspect-square relative bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-6 group">
                <Image
                    src={imageUrls[activeImageIndex]}
                    alt={`${productName} - View ${activeImageIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain w-full h-full p-4 transition-all duration-300"
                />

                {/* Left & Right Arrow Slider Overlays */}
                {imageUrls.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-3 p-2 rounded-full border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs cursor-pointer z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-3 p-2 rounded-full border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs cursor-pointer z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </>
                )}
            </div>

            {/* "More Photos" Thumbnail Grid Selector */}
            {imageUrls.length > 1 && (
                <div className="flex flex-wrap gap-3 items-center">
                    {imageUrls.map((url, index) => (
                        <button
                            key={url + index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-white border rounded-md overflow-hidden p-1 transition-all cursor-pointer ${activeImageIndex === index
                                    ? "border-[#24523e] ring-2 ring-[#24523e]/10 shadow-sm" // Active border style matching screenshot
                                    : "border-gray-200 hover:border-gray-400"
                                }`}
                        >
                            <div className="w-full h-full relative">
                                <Image
                                    src={url}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 80px, 100px"
                                    className="object-contain"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}