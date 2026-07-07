import Image from "next/image";
import Link from "next/link";
// 1. Change the import path to target your new file verbatim
import ApparelBanner from "@/public/images/banner/banner.png";

export default function HomeBanner() {
    return (
        <div className="py-16 md:py-0 bg-shop-light-pink rounded-lg px-10 lg:px-24 flex items-center justify-between min-h-[380px]">

            {/* Left Column: Premium Fashion Typography */}
            <div className="flex flex-col space-y-5 max-w-lg">
                <span className="text-xs font-bold tracking-widest text-shop-orange uppercase">
                    Season Essentials
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-shop-dark-green tracking-tight capitalize leading-tight">
                    Elevate Your Style <br /> Up To 50% Off
                </h2>
                <p className="text-sm text-shop-gray-dark max-w-sm font-light leading-relaxed">
                    Explore our curated capsule collections designed around timeless aesthetics and tailored everyday premium comforts.
                </p>
                <Link
                    href="/shop"
                    className="bg-shop-dark-green/90 text-white hover:bg-shop-dark-green text-sm font-semibold px-6 py-3 rounded-md transition duration-200 self-start shadow-xs"
                >
                    Shop The Collection
                </Link>
            </div>

            {/* Right Column: Refined to display banner.jpg beautifully */}
            {/* Right Column: Expanded to give banner.jpg a larger, prominent showcase */}
            <div className="hidden md:inline-flex w-[480px] h-[400px] lg:w-[540px] lg:h-[440px] relative transition-all duration-300">
                <Image
                    src={ApparelBanner}
                    alt="Bazaar Seasonal Suits Collection Promotion"
                    className="object-contain object-right scale-105"
                    fill
                    unoptimized
                    priority
                />
            </div>
        </div>
    );
}