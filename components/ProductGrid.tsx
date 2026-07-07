"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { client } from "@/sanity/lib/client";
import HomeTabBar from "./HomeTabBar";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

export default function ProductGrid() {
    const [selectedTab, setSelectedTab] = useState("T-Shirts"); // Updated default tab
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchInventory() {
            setLoading(true);

            // Follows the arrow reference key from your seeder script to read the category title
            const query = `*[_type == "product" && category->title == $categoryName] {
        ...,
        "categoryTitle": category->title
      }`;

            const params = { categoryName: selectedTab };

            try {
                const response = await client.fetch(query, params);
                setProducts(response);
            } catch (error) {
                console.error("Clothing product fetching error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchInventory();
    }, [selectedTab]);

    return (
        <div className="py-10">
            <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-10 min-h-[320px] gap-4 w-full"
                    >
                        <Loader2 className="w-5 h-5 animate-spin text-shopDarkGreen" />
                        <span className="text-sm font-medium text-shopDarkGreen">Updating Lookbook...</span>
                    </motion.div>
                ) : products.length === 0 ? (
                    <NoProductAvailable key="empty" selectedTab={selectedTab} />
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10"
                    >
                        {products.map((product: any) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}