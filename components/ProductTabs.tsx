"use client";

import React, { useState } from "react";

interface ProductTabsProps {
    description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description");

    const tabs = ["description", "additional information", "reviews"];

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white mt-12 shadow-xs">
            {/* Tab Triggers Header */}
            <div className="flex border-b border-gray-100 bg-shop-gray-light/30">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-gray-100 transition cursor-pointer ${activeTab === tab
                                ? "bg-white text-shop-dark border-b-2 border-b-shop-orange"
                                : "text-shop-gray-dark hover:text-shop-dark"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dynamic Tab Body Content Viewport */}
            <div className="p-6 text-xs text-shop-gray-dark font-light leading-relaxed">
                {activeTab === "description" && (
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold text-shop-dark uppercase tracking-wider mb-2">
                            Fabric & Fit Notes
                        </h3>
                        <p className="whitespace-pre-line">
                            {description || "No description cataloged for this garment look."}
                        </p>
                    </div>
                )}

                {activeTab === "additional information" && (
                    <p>
                        Premium tailored structural compositions. Pre-shrunk industrial artisan weaves optimized for garment form longevity and moisture-wicking comfort metrics.
                    </p>
                )}

                {activeTab === "reviews" && (
                    <p>
                        Verified purchase logs display a high level of satisfaction across seasonal clothing release blocks.
                    </p>
                )}
            </div>
        </div>
    );
}