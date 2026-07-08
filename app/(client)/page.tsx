import { sanityFetch } from "@/sanity/lib/live";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
// Import our new horizontal fashion slider component
import LatestCollectionSlider from "@/components/LatestCollectionSlider";

// Keeping our optimized GROQ query clean
const LATEST_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc)[0...7] {
  ...,
  "slug": slug.current,
  "imageUrl": images[0].asset->url,
  category->{
    title
  }
}`;

export default async function HomePage() {
  const { data: products } = await sanityFetch({ query: LATEST_PRODUCTS_QUERY });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col min-h-screen space-y-12">
      {/* 1. The Hero Banner Component */}
      <HomeBanner />

      {/* 2. Interactive Tabbed Category Filter Grid */}
      <ProductGrid />

      {/* 3. New Horizontal Lookbook Slider Section */}
      <LatestCollectionSlider products={products as any[]} />
    </main>
  );
}