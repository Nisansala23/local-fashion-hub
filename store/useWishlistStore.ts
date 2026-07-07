"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    _id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    slug: string;
}

interface WishlistState {
    wishlist: WishlistItem[];
    toggleWishlist: (item: WishlistItem) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            // Universal core data state initialization
            wishlist: [],

            // Smart Toggle Action handler (handles both addition and removal safely)
            toggleWishlist: (item) => {
                const currentWishlist = get().wishlist || []; // Fallback safety array array check
                const exists = currentWishlist.find((i) => i._id === item._id);

                if (exists) {
                    // If item is found, filter it out of the array
                    set({ wishlist: currentWishlist.filter((i) => i._id !== item._id) });
                } else {
                    // If item is completely new, cleanly append it to the current snapshot matrix
                    set({ wishlist: [...currentWishlist, item] });
                }
            },

            // Bulk Sanitation Action handler (resets the entire array pool in a single execution step)
            clearWishlist: () => set({ wishlist: [] }),
        }),
        {
            name: "shopcart-wishlist", // Direct storage identifier used inside browser localStorage
        }
    )
);