import ProductTabs from "@/components/ProductTabs";
import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import ProductQuickActions from "./ProductQuickActions";
import RelatedProducts from "./RelatedProducts";
import ProductMicroUtilities from "@/components/ProductMicroUtilities";

import Link from "next/link";
import {
    ArrowLeft,
    Star,
    ChevronDown,
    Scale,
    HelpCircle,
    Truck,
    Share2
} from "lucide-react";
import ProductImage from "./ProductImage";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    description: string;
    price: number;
    discount?: number;
    stock: number;
    images: any[];
    categoryTitle: string;
    sku?: string;
}

async function SingleProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    discount,
    stock,
    images,
    sku,
    "categoryTitle": category->title
  }`;

    const product: Product = await client.fetch(query, { slug });

    if (!product) {
        return notFound();
    }

    const imageUrls =
        product.images && product.images.length > 0
            ? product.images.map((img) => urlFor(img).url())
            : [];

    const finalPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return (
        <>
            {/* Breadcrumb Header Navigation */}
            <div className="bg-white border-b border-gray-100">
                <Container className="py-4">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-950 transition"
                    >
                        <ArrowLeft size={14} />
                        Back to Shop
                    </Link>
                </Container>
            </div>

            {/* Main Product Context View */}
            <Container className="py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Product Image Display Gallery */}
                    <ProductImage imageUrls={imageUrls} productName={product.name} />

                    {/* Right Side: Product Configuration & Details */}
                    <div className="space-y-5">
                        <div>
                            {/* Product Title */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                                {product.name}
                            </h1>
                            {/* Short Intro Snippet */}
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                                {product.description.split('.')[0]}. Experience premium build and layout excellence built for modern standard workflows.
                            </p>
                        </div>

                        {/* Star Rating Layout Row */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className="fill-[#24523e] text-[#24523e]"
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-400 font-medium ml-1">(96)</span>
                        </div>

                        {/* Pricing & Stock Status Badges */}
                        <div className="space-y-2 pt-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${finalPrice.toFixed(2)}
                                </span>
                                {product.discount && (
                                    <span className="text-sm text-gray-400 line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div>
                                <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md ${product.stock > 0
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                        </div>

                        {/* Calling your newly optimized client interactivity layer (Sizes + Add To Cart + Working Wishlist) */}
                        <ProductQuickActions
                            product={{
                                _id: product._id,
                                name: product.name,
                                price: finalPrice,
                                stock: product.stock,
                                imageUrl: imageUrls[0] || null,
                                slug: product.slug.current,
                            }}
                        />
                        <ProductMicroUtilities />

                        {/* Expandable Characteristics Accordion Section */}
                        <div className="border-t border-gray-100 pt-2">
                            <details className="group border-b border-gray-100 pb-3" open>
                                <summary className="flex justify-between items-center text-xs font-semibold text-gray-800 cursor-pointer list-none py-2">
                                    <span>{product.name} Characteristics</span>
                                    <ChevronDown size={14} className="transform transition-transform group-open:rotate-180 text-gray-400" />
                                </summary>
                                <div className="text-xs text-gray-500 space-y-1.5 pt-2 pl-1 bg-gray-50/50 p-3 rounded-md border border-gray-100">
                                    <div className="flex justify-between"><span className="text-gray-400">SKU:</span> <span className="font-medium">{product.sku || "N/A"}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Category:</span> <span className="font-medium">{product.categoryTitle || "General"}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Availability:</span> <span className="font-medium">{product.stock} Units left</span></div>
                                </div>
                            </details>
                        </div>

                        {/* Horizontal Micro-Utility Actions Row */}
                        <div className="grid grid-cols-4 divide-x divide-gray-100 text-center text-[11px] text-gray-500 font-medium border-b border-gray-100 pb-4">
                            <button className="hover:text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer">
                                <Scale size={13} className="text-gray-400" /> Compare color
                            </button>
                            <button className="hover:text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer">
                                <HelpCircle size={13} className="text-gray-400" /> Ask a question
                            </button>
                            <button className="hover:text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer">
                                <Truck size={13} className="text-gray-400" /> Delivery & Return
                            </button>
                            <button className="hover:text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer">
                                <Share2 size={13} className="text-gray-400" /> Share
                            </button>
                        </div>

                        {/* Static Delivery Promise Layout Blocks */}
                        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="flex gap-3.5 items-start">
                                <div className="text-lg mt-0.5 text-orange-500">🚚</div>
                                <div>
                                    <p className="font-bold text-gray-900 text-xs">Free Delivery</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                        Enter your postal code for localized shipping availability options.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3.5 items-start border-t border-gray-200/60 pt-3">
                                <div className="text-lg mt-0.5 text-orange-500">↩️</div>
                                <div>
                                    <p className="font-bold text-gray-900 text-xs">Return Delivery</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                        Free 30-day window returns provided on all verified production orders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductTabs description={product.description} />
                <RelatedProducts
                    categoryTitle={product.categoryTitle}
                    excludeId={product._id}
                />
            </Container>
        </>
    );
}

export default SingleProductPage;