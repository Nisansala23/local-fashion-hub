import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define what a Cart Item looks like
export interface CartItem {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    slug: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    isCartOpen: boolean; // 👈 Tracks if drawer overlay is open
    setIsCartOpen: (open: boolean) => void; // 👈 Updates drawer overlay state
    // 🚀 FIXED TYPE: Now allows passing an optional quantity value inside the object payload
    addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isCartOpen: false, // 👈 Initialized as closed

            // Control drawer overlay visibility state
            setIsCartOpen: (open) => set({ isCartOpen: open }),

            // 1. Logic to add item or increase quantity by the chosen multi-select count payload
            addToCart: (newItem) =>
                set((state) => {
                    // Extract custom quantity payload, default to 1 if not passed (e.g. from shop card fast clicks)
                    const quantityToAdd = newItem.quantity ?? 1;

                    const existingItem = state.cart.find((item) => item._id === newItem._id);

                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item._id === newItem._id
                                    ? { ...item, quantity: item.quantity + quantityToAdd } // 🚀 FIXED: Dynamic multi-addition!
                                    : item
                            ),
                        };
                    }

                    // 🚀 FIXED: New items now start with the exact selection quantity instead of forcing 1!
                    return { cart: [...state.cart, { ...newItem, quantity: quantityToAdd }] };
                }),

            // 2. Remove an item completely from the cart
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item._id !== id),
                })),

            // 3. Reset cart to empty after a successful checkout
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "bazaar-shopping-cart", // Key used to store cart data inside browser localStorage
        }
    )
);