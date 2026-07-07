"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Upgraded from <img> to Next.js <Image />
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";

interface RelatedProduct {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    discount?: number;
    images: any[];
}

interface RelatedProductsProps {
    categoryTitle: string; // Changed from categoryId to match your parent data fetch
    excludeId: string;
}

const RelatedProducts = ({ categoryTitle, excludeId }: RelatedProductsProps) => {
    const [products, setProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!categoryTitle) return;
            try {
                const query = `*[_type == "product" && category->title == $category && _id != $excludeId][0...4] {
          _id,
          name,
          slug,
          price,
          discount,
          images
        }`;

                const data = await client.fetch(query, {
                    category: categoryTitle,
                    excludeId: excludeId,
                });

                setProducts(data);
            } catch (error) {
                console.error("Error fetching related products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [categoryTitle, excludeId]);

    if (loading || products.length === 0) {
        return null;
    }

    return (
        <Container className="py-12 border-t border-gray-100 mt-10">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase mb-8">
                You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => {
                    const imageUrl =
                        product.images && product.images.length > 0
                            ? urlFor(product.images[0]).url()
                            : null;

                    return (
                        <Link
                            key={product._id}
                            href={`/product/${product.slug.current}`}
                            className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            {/* Image Box */}
                            <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden block">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-contain p-4 transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-light">
                                        No Preview
                                    </div>
                                )}
                            </div>

                            {/* Info Details */}
                            <div className="p-4 flex flex-col flex-grow space-y-2">
                                <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 transition group-hover:text-[#24523e]">
                                    {product.name}
                                </h3>

                                <div className="pt-1 mt-auto">
                                    <PriceView
                                        price={product.price}
                                        discount={product.discount}
                                        className="text-sm font-bold text-gray-900"
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Container>
    );
};

export default RelatedProducts;