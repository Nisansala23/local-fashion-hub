"use client";

import { Layers, HelpCircle, Truck, Share2 } from "lucide-react";

const ProductMicroUtilities = () => {
    const actions = [
        {
            icon: Layers,
            label: "Compare color",
            onClick: () => console.log("Compare color triggered"),
        },
        {
            icon: HelpCircle,
            label: "Ask a question",
            onClick: () => console.log("Ask a question triggered"),
        },
        {
            icon: Truck,
            label: "Delivery info",
            onClick: () => console.log("Delivery info triggered"),
        },
        {
            icon: Share2,
            label: "Share item",
            onClick: () => console.log("Share item triggered"),
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-gray-100 pb-5 pt-2 text-center">
            {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-900 hover:bg-gray-50/80 px-2 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
                        aria-label={action.label}
                    >
                        {/* Standardized to use your exact cornerstone deep green theme color */}
                        <Icon className="w-3.5 h-3.5 text-[#24523e] flex-shrink-0" />
                        <span className="truncate">{action.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default ProductMicroUtilities;