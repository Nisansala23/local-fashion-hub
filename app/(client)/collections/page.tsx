import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: any[];
    slug: { current: string };
    discountPercentage?: number;
}

export default async function CollectionsPage() {
    // Fetch only products where the 'isHotDeal' boolean switch is checked true in Sanity
    const hotDealsQuery = `*[_type == "product" && isHotDeal == true] | order(_createdAt desc)[0...4] {
        _id,
        name,
        price,
        stock,
        images,
        slug,
        discountPercentage
    }`;

    const hotDealsProducts: Product[] = await client.fetch(hotDealsQuery);

    return (
        <div className="min-h-screen bg-white py-12 space-y-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Main Typography Headings */}
                <div className="text-center max-w-xl mx-auto mb-16">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-shop-orange block mb-2">
                        Curated Wardrobes
                    </span>
                    <h1 className="text-3xl font-black text-shop-dark uppercase tracking-tight">
                        Bazaar Collections
                    </h1>
                    <div className="w-12 h-[1px] bg-gray-200 mx-auto mt-4" />
                </div>

                {/* SECTION 1: Editorial Visual Lookbook Grid Covers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

                    {/* Collection Card 1 */}
                    <Link
                        href="/shop?category=essentials"
                        className="relative aspect-16/10 rounded-2xl overflow-hidden bg-shop-gray-light group border border-gray-150/40 block cursor-pointer"
                    >
                        <Image
                            src="/images/essentials-banner.webp"
                            alt="Minimalist Essentials"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                        <div className="absolute bottom-6 left-6 z-20 text-white space-y-1">
                            <h3 className="text-sm font-black uppercase tracking-widest">Minimalist Essentials</h3>
                            <p className="text-[11px] font-light opacity-90">Clean, structural lines optimized for daily comfort guides.</p>
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest pt-2 underline decoration-shop-orange underline-offset-4 hover:text-shop-orange transition">
                                Explore Capsule
                            </span>
                        </div>
                    </Link>

                    {/* Collection Card 2 */}
                    <Link
                        href="/shop?category=outerwear"
                        className="relative aspect-16/10 rounded-2xl overflow-hidden bg-shop-gray-light group border border-gray-150/40 block cursor-pointer"
                    >
                        <Image
                            src="/images/outerwear-banner.webp"
                            alt="Premium Outerwear"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                        <div className="absolute bottom-6 left-6 z-20 text-white space-y-1">
                            <h3 className="text-sm font-black uppercase tracking-widest">Premium Outerwear</h3>
                            <p className="text-[11px] font-light opacity-90">Tailored multi-season layers built with resilient textile blends.</p>
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest pt-2 underline decoration-shop-orange underline-offset-4 hover:text-shop-orange transition">
                                Explore Capsule
                            </span>
                        </div>
                    </Link>
                </div>

                {/* SECTION 2: The Interactive Hot Deals / Limited Flash Sale Viewport */}
                <div className="border border-dashed border-gray-200 bg-shop-gray-light/20 rounded-3xl p-8 lg:p-12 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-200/60 pb-4">
                        <div>
                            <h2 className="text-xl font-black text-shop-dark uppercase tracking-tight flex items-center gap-2">
                                Limited Flash Sales <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-md animate-pulse font-bold tracking-widest">HOT</span>
                            </h2>
                            <p className="text-xs text-shop-gray-dark font-light mt-0.5">Enjoy timed pricing discount structural updates across premium stock catalog balances.</p>
                        </div>
                        <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-shop-dark-green hover:text-shop-orange underline transition">
                            View All Offers &rarr;
                        </Link>
                    </div>

                    {/* Render hot deal items dynamically via your ProductCard blueprint */}
                    {hotDealsProducts.length === 0 ? (
                        <div className="text-center py-12 text-xs text-shop-gray-dark font-light">
                            No seasonal flash promotions are running today. Check back soon for new style clearances!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {hotDealsProducts.map((product) => (
                                <div key={product._id} className="relative">
                                    {/* Dynamic absolute float discount marker bubble */}
                                    {product.discountPercentage && (
                                        <span className="absolute top-3 left-3 bg-shop-orange text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md z-20 shadow-xs">
                                            Save {product.discountPercentage}%
                                        </span>
                                    )}
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}