import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: any[];
    slug: { current: string };
    categoryTitle?: string;
}

interface SearchParams {
    category?: string;
    price?: string;
}

interface Props {
    searchParams: Promise<SearchParams>;
}

export default async function ShopPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const activeCategorySlug = resolvedSearchParams.category || "all";
    const activePriceRange = resolvedSearchParams.price || "all";

    // 1. Fetch categories for our Left Sidebar Panel
    const categoriesQuery = `*[_type == "category"] {
    _id,
    title,
    slug
  }`;

    // 2. Dynamically construct the Sanity GROQ query based on both category and price constraints
    let filterConditions = ['_type == "product"'];

    if (activeCategorySlug !== "all") {
        filterConditions.push('category->slug.current == $categorySlug');
    }

    if (activePriceRange === "under-50") {
        filterConditions.push('price < 50');
    } else if (activePriceRange === "50-100") {
        filterConditions.push('price >= 50 && price <= 100');
    } else if (activePriceRange === "over-100") {
        filterConditions.push('price > 100');
    }

    const productsQuery = `*[${filterConditions.join(" && ")}] | order(_createdAt desc) {
    ...,
    "categoryTitle": category->title
  }`;

    const [categories, products] = await Promise.all([
        client.fetch<Category[]>(categoriesQuery),
        client.fetch<Product[]>(productsQuery, { categorySlug: activeCategorySlug })
    ]);

    const sanitizedProducts = products.map(product => ({
        ...product,
        images: product.images || []
    }));

    // Helper function to build clean URLs keeping existing parameters active
    const buildFilterUrl = (type: "category" | "price", value: string) => {
        const categoryParam = type === "category" ? value : activeCategorySlug;
        const priceParam = type === "price" ? value : activePriceRange;
        return `/shop?category=${categoryParam}&price=${priceParam}`;
    };

    const priceTiers = [
        { label: "All Prices", value: "all" },
        { label: "Under $50", value: "under-50" },
        { label: "$50 - $100", value: "50-100" },
        { label: "Over $100", value: "over-100" },
    ];

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Layout Header */}
                <div className="mb-10 pb-6 border-b border-gray-100">
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">
                        Boutique Catalog
                    </h1>
                    <p className="text-xs text-gray-500 mt-1 font-light">
                        Displaying {sanitizedProducts.length} statement apparel pieces
                    </p>
                </div>

                {/* Two-Column Matrix Workspace */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* LEFT SIDEBAR PANEL: Categories & Price Filters */}
                    <aside className="w-full lg:w-60 flex-shrink-0 lg:sticky lg:top-28 space-y-8">

                        {/* 1. Category Filter Section */}
                        <div className="space-y-3">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden lg:block">
                                Product Categories
                            </h2>
                            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-1.5 scrollbar-none">
                                <a
                                    href={buildFilterUrl("category", "all")}
                                    className={`text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-xl transition duration-200 whitespace-nowrap block text-center lg:text-left ${activeCategorySlug === "all"
                                        ? "bg-[#24523e] text-white shadow-2xs"
                                        : "text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 lg:bg-transparent"
                                        }`}
                                // Changed active state color to map perfectly to your primary dark green aesthetic
                                >
                                    All Garments
                                </a>

                                {categories.map((cat) => (
                                    <a
                                        key={cat._id}
                                        href={buildFilterUrl("category", cat.slug.current)}
                                        className={`text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-xl transition duration-200 whitespace-nowrap block text-center lg:text-left ${activeCategorySlug === cat.slug.current
                                            ? "bg-[#24523e] text-white shadow-2xs"
                                            : "text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 lg:bg-transparent"
                                            }`}
                                    >
                                        {cat.title}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* 2. Price Filter Section */}
                        <div className="pt-6 border-t border-gray-100 lg:pt-0 lg:border-t-0 space-y-3">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                Filter By Price
                            </h2>
                            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1.5 scrollbar-none">
                                {priceTiers.map((tier) => (
                                    <a
                                        key={tier.value}
                                        href={buildFilterUrl("price", tier.value)}
                                        className={`text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl transition duration-200 whitespace-nowrap block text-center lg:text-left ${activePriceRange === tier.value
                                            ? "bg-[#24523e] text-white shadow-2xs"
                                            : "text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 lg:bg-transparent"
                                            }`}
                                    >
                                        {tier.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* RIGHT VIEWPORT MATRIX: Interactive Grid */}
                    <div className="flex-1 w-full">
                        {sanitizedProducts.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                <p className="text-xs text-gray-400 font-light tracking-wide">
                                    No items matched your combination of active filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                                {sanitizedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}