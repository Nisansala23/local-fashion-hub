"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, Truck, RefreshCw, MessageSquare, HelpCircle, Share2, Layers } from "lucide-react";
import { useCartStore } from "@/store/userCartStore";

interface ProductDetailsClientProps {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        description: string;
        images?: Array<{ asset: { url: string } }>;
        slug: { current: string };
    };
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    // Parse lookbook images array fallback safely
    const itemImages = product.images && product.images.length > 0
        ? product.images.map(img => img.asset.url)
        : ["/images/placeholder.jpg"];

    // State hooks for gallery tracking, quantity management, and active text tabs
    const [activeImage, setActiveImage] = useState(itemImages[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    const subtotal = product.price * quantity;

    const handleIncrement = () => {
        if (quantity < product.stock) setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToBag = () => {
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: itemImages[0],
            slug: product.slug.current,
        });
    };

    return (
        <div className="space-y-16">

            {/* Upper Section: Core Workspace Interactive Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* LEFT COLUMN: Gallery Dashboard Array */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full bg-shop-gray-light border border-gray-100 rounded-2xl overflow-hidden">
                        <Image
                            src={activeImage}
                            alt={product.name}
                            fill
                            className="object-contain p-6"
                            priority
                        />
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {itemImages.map((imgUrl, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(imgUrl)}
                                className={`relative w-20 h-20 bg-shop-gray-light border-2 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer transition ${activeImage === imgUrl ? "border-shop-dark" : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <Image src={imgUrl} alt="Thumbnail view" fill className="object-cover p-1" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Interactive Control Station */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-black text-shop-dark tracking-tight uppercase">
                            {product.name}
                        </h1>

                        {/* Review Block Counter Mock */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-shop-orange">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </div>
                            <span className="text-xs text-shop-gray-dark font-light">(120 verified reviews)</span>
                        </div>
                    </div>

                    {/* Pricing Row Layout */}
                    <div className="flex items-baseline gap-3 border-b border-gray-100 pb-4">
                        <span className="text-2xl font-black text-shop-dark-green">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-shop-gray-dark line-through font-light">
                            ${(product.price * 1.15).toFixed(2)}
                        </span>
                        <span className="ml-2 text-[10px] font-bold bg-green-50 text-shop-dark-green uppercase tracking-wider px-2 py-1 rounded-md border border-green-100">
                            {product.stock > 0 ? "In Stock" : "Sold Out"}
                        </span>
                    </div>

                    {/* Stepper counter & Total readout row */}
                    <div className="bg-shop-gray-light/30 border border-gray-100/50 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between text-xs text-shop-gray-dark">
                            <span className="font-medium uppercase tracking-wider">Select Quantity</span>
                            <span className="font-light">Subtotal: <span className="font-black text-shop-dark-green text-sm">${subtotal.toFixed(2)}</span></span>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
                                <button
                                    onClick={handleDecrement}
                                    className="px-4 py-2 text-shop-dark hover:bg-gray-50 transition cursor-pointer font-bold"
                                >
                                    -
                                </button>
                                <span className="px-4 text-xs font-bold text-shop-dark min-w-[32px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    className="px-4 py-2 text-shop-dark hover:bg-gray-50 transition cursor-pointer font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToBag}
                                disabled={product.stock === 0}
                                className="flex-1 bg-shop-dark-green hover:bg-opacity-90 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-200"
                            >
                                Add to Cart
                            </button>

                            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-shop-dark">
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Boutique Utilities Ribbon Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-bold uppercase tracking-wider text-shop-gray-dark border-b border-gray-100 pb-4">
                        <button className="flex items-center gap-1.5 hover:text-shop-dark transition cursor-pointer py-1"><Layers className="w-3.5 h-3.5 text-shop-orange" /> Compare color</button>
                        <button className="flex items-center gap-1.5 hover:text-shop-dark transition cursor-pointer py-1"><HelpCircle className="w-3.5 h-3.5 text-shop-orange" /> Ask question</button>
                        <button className="flex items-center gap-1.5 hover:text-shop-dark transition cursor-pointer py-1"><MessageSquare className="w-3.5 h-3.5 text-shop-orange" /> Delivery info</button>
                        <button className="flex items-center gap-1.5 hover:text-shop-dark transition cursor-pointer py-1"><Share2 className="w-3.5 h-3.5 text-shop-orange" /> Share item</button>
                    </div>

                    {/* Logistics Trust Cards */}
                    <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-white">
                        <div className="p-4 flex gap-3 items-start">
                            <Truck className="w-5 h-5 text-shop-orange mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-xs font-bold text-shop-dark">Complimentary Standard Shipping</h4>
                                <p className="text-[11px] text-shop-gray-dark font-light mt-0.5">Enter your postal area code at checkout to confirm localized tracking windows.</p>
                            </div>
                        </div>
                        <div className="p-4 flex gap-3 items-start">
                            <RefreshCw className="w-5 h-5 text-shop-orange mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-xs font-bold text-shop-dark">Flexible Return Logistics</h4>
                                <p className="text-[11px] text-shop-gray-dark font-light mt-0.5">Enjoy straightforward 30-day garment processing window exchanges completely worry-free.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Lower Section: Navigation Information Tabs Hub */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                <div className="flex border-b border-gray-100 bg-shop-gray-light/30">
                    {["description", "additional information", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-gray-100 transition cursor-pointer ${activeTab === tab ? "bg-white text-shop-dark border-b-2 border-b-shop-orange" : "text-shop-gray-dark hover:text-shop-dark"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6 text-xs text-shop-gray-dark font-light leading-relaxed">
                    {activeTab === "description" && (
                        <p className="whitespace-pre-line">{product.description || "No descriptions attached to this item capsule."}</p>
                    )}
                    {activeTab === "additional information" && (
                        <p>Premium tailored structural compositions. Pre-shrunk industrial luxury weaves optimized for form longevity and moisture resistance metrics.</p>
                    )}
                    {activeTab === "reviews" && (
                        <p>Verified purchase accounts display clean 5-star customer feedback ratings across active seasonal garment launches.</p>
                    )}
                </div>
            </div>

        </div>
    );
}