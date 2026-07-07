import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 space-y-12 bg-white">

            {/* Editorial Header Section */}
            <div className="text-center space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-shop-orange block">
                    Behind the Design
                </span>
                <h1 className="text-3xl font-black text-shop-dark uppercase tracking-tight">
                    Our Story
                </h1>
                <div className="w-12 h-[1px] bg-gray-200 mx-auto pt-1" />
            </div>

            {/* Campaign Feature Image Container */}
            <div className="relative aspect-16/10 w-full bg-shop-gray-light rounded-2xl overflow-hidden border border-gray-150/40 shadow-xs">
                <Image
                    src="/images/our-story.jpg"
                    alt="Bazaar Campaign Editorial Lookbook"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    className="object-cover"
                />
            </div>

            {/* Narrative Storytelling Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-shop-dark">
                        The Philosophy
                    </h2>
                    <p className="text-xs leading-relaxed text-shop-gray-dark font-light">
                        Founded with a vision to redefine everyday modern wardrobe capsules, <span className="font-semibold text-shop-dark">Bazaar</span> balances structural precision with premium, sustainable materials. We design statement garments that reject fast-fashion expiration dates, focusing instead on timeless engineering and textile longevity.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-shop-dark">
                        The Craftsmanship
                    </h2>
                    <p className="text-xs leading-relaxed text-shop-gray-dark font-light">
                        Every piece in our boutique collection is meticulously sourced and manufactured under strict ethical mandates. By blending traditional artisan weaving patterns with clean modern silhouettes, we create wearable art that feels intimately personal yet effortlessly contemporary.
                    </p>
                </div>
            </div>

        </main>
    );
}