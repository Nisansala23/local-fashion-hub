"use client";

import Link from "next/link";

const clothingCategories = [
    "T-Shirts", "Shirts", "Hoodies", "Jackets", "Dresses",
    "Trousers", "Shorts", "Skirts", "Crop Tops", "Kurtis"
];

interface Props {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

export default function HomeTabBar({ selectedTab, onTabSelect }: Props) {
    return (
        <div className="flex items-center justify-between flex-wrap gap-5 border-b pb-4">
            {/* Scrollable container for fashion tabs on smaller screens */}
            <div className="flex items-center gap-3 text-sm font-semibold overflow-x-auto max-w-full pb-2 md:pb-0 md:flex-wrap no-scrollbar">
                {clothingCategories.map((cat) => {
                    const isActive = selectedTab.toLowerCase() === cat.toLowerCase();
                    return (
                        <button
                            key={cat}
                            onClick={() => onTabSelect(cat)}
                            className={`whitespace-nowrap border px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300 cursor-pointer ${isActive
                                    ? "bg-[#24523e] text-white border-[#24523e] shadow-2xs" // 🚀 FIXED: Hardcoded your exact green palette match here
                                    : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* 'See All' button updated to use explicit color hex markers matching your hover profile style */}
            <Link
                href="/shop"
                className="border border-[#24523e]/30 text-[#24523e] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#24523e] hover:text-white transition-all"
            >
                See All
            </Link>
        </div>
    );
}