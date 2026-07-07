"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageViewProps {
    imageUrls: string[];
    productName: string;
}

export default function ImageView({ imageUrls, productName }: ImageViewProps) {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const mainImageUrl = imageUrls[activeImageIdx] || null;

    return (
        <div className="space-y-4 w-full">
            {/* Primary Lookbook Image Feature */}
            <div className="bg-shop-gray-light rounded-2xl flex items-center justify-center border border-gray-150/60 aspect-square relative w-full overflow-hidden group">
                {mainImageUrl && (
                    <Image
                        src={mainImageUrl}
                        alt={productName || "Apparel preview frame"}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                        priority
                    />
                )}
            </div>

            {/* Multi-angle Gallery Thumbnails Stream */}
            {imageUrls.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {imageUrls.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImageIdx(index)}
                            className={`relative aspect-square bg-shop-gray-light border-2 rounded-xl overflow-hidden cursor-pointer transition ${activeImageIdx === index
                                    ? "border-shop-dark shadow-xs"
                                    : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={url}
                                alt={`${productName} thumbnail perspective view ${index + 1}`}
                                fill
                                sizes="80px"
                                className="object-cover p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}