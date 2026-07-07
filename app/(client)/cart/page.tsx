"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, Loader2, Plus, Minus, Heart, MapPin } from "lucide-react";
import { useCartStore } from "@/store/userCartStore";
import { motion } from "framer-motion"; // 🚀 NEW: Importing his animation engine

interface Address {
    id: string;
    name: string;
    street: string;
    cityStateZip: string;
}

export default function CartPage() {
    const { cart, removeFromCart, clearCart, addToCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addresses, setAddresses] = useState<Address[]>([
        { id: "1", name: "Ghoul SelfMusic", street: "sdfsdf, Tolga", cityStateZip: "Biskra 23432" },
        { id: "2", name: "Home Profile", street: "123 Innovation Way", cityStateZip: "Colombo 00700, LK" }
    ]);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("1");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ name: "", street: "", cityStateZip: "" });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = subtotal > 200 ? subtotal * 0.1 : 0;
    const orderTotal = subtotal - discount;

    const updateQuantity = (item: any, amount: number) => {
        const targetQty = item.quantity + amount;
        if (targetQty <= 0) {
            removeFromCart(item._id);
            return;
        }
        addToCart({ ...item, quantity: amount });
    };

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAddress.name || !newAddress.street || !newAddress.cityStateZip) return;
        const createdAddress: Address = { id: Date.now().toString(), ...newAddress };
        setAddresses([...addresses, createdAddress]);
        setSelectedAddressId(createdAddress.id);
        setNewAddress({ name: "", street: "", cityStateZip: "" });
        setShowAddressForm(false);
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems: cart }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to establish checkout session.");
            }
        } catch (error) {
            console.error("Stripe Connection Error:", error);
            alert("An error occurred connecting to checkout.");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-400 text-sm font-medium animate-pulse">Loading Cart Hub...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f9fa] py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
                    <ShoppingBag className="w-5 h-5 text-gray-800" />
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
                </div>

                {cart.length === 0 ? (
                    /* 🎨 Redesigned Card incorporating his dynamic framer-motion keyframes directly */
                    <div className="w-full py-12 px-4 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center flex flex-col items-center justify-center relative"
                        >

                            {/* 🚀 FIXED: Wrapped the image inside his exact rock-and-scale custom rotation values */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut",
                                }}
                                className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center"
                            >
                                <div className="w-40 h-40 bg-white rounded-2xl flex items-center justify-center p-2 overflow-hidden">
                                    <Image
                                        src="/images/empty-cart.png" // Safe to load your regular static image asset now!
                                        alt="Cart is feeling lonely illustration"
                                        width={160}
                                        height={160}
                                        className="object-contain drop-shadow-lg"
                                        priority
                                    />
                                </div>

                                {/* 🚀 FIXED: Floating Blue Circle Cart Badge Accent moving with his exact float settings */}
                                <motion.div
                                    animate={{
                                        x: [0, -10, 10, 0],
                                        y: [0, -5, 5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "linear",
                                    }}
                                    className="absolute -top-1 -right-1 w-9 h-9 bg-[#2563eb] rounded-full flex items-center justify-center shadow-md z-10"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                                Your cart is feeling lonely
                            </h2>
                            <p className="text-gray-400 text-xs font-semibold leading-relaxed max-w-xs mb-6">
                                It looks like you haven't added anything to your cart yet. Let's change that and find some amazing products for you!
                            </p>

                            <Link
                                href="/"
                                className="w-full text-center border border-gray-200 bg-gray-50 text-gray-800 text-xs font-bold py-3.5 px-6 rounded-full transition duration-200 hover:bg-gray-100 tracking-wide"
                            >
                                Discover Products
                            </Link>
                        </motion.div>
                    </div>
                ) : (
                    /* Active Main Split Table Layout Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* LEFT COLUMN: Item Lists Box Container */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
                                <div className="divide-y divide-gray-100">
                                    {cart.map((item) => (
                                        <div key={item._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">

                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="relative w-20 h-20 bg-gray-50 border border-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                    {item.imageUrl && (
                                                        <Image src={item.imageUrl} alt={item.name} fill unoptimized className="object-contain p-1" />
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</h3>
                                                    <p className="text-xs text-gray-400 font-medium">Variant: <span className="text-gray-600">Garment</span></p>
                                                    <p className="text-xs text-gray-400 font-medium">Status: <span className="text-[#24523e] font-semibold">New</span></p>

                                                    <div className="flex items-center gap-3 pt-1">
                                                        <button className="text-gray-400 hover:text-[#24523e] transition cursor-pointer">
                                                            <Heart size={14} />
                                                        </button>
                                                        <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition cursor-pointer">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right sm:block hidden min-w-[100px]">
                                                <span className="text-base font-bold text-gray-900">${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </div>

                                            <div className="flex items-center border border-gray-200 rounded-md bg-white overflow-hidden shadow-3xs">
                                                <button onClick={() => updateQuantity(item, -1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition cursor-pointer text-gray-500">
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-3 text-xs font-bold text-gray-800 w-8 text-center select-none">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item, 1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition cursor-pointer text-gray-500">
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => clearCart()} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-md transition shadow-2xs uppercase tracking-wider cursor-pointer">
                                Reset Cart
                            </button>
                        </div>

                        {/* RIGHT COLUMN: Order Calculations & Addresses Panels */}
                        <div className="space-y-4 lg:sticky lg:top-24">

                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
                                <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Order Summary</h2>
                                <div className="space-y-2.5 text-xs text-gray-600 font-medium">
                                    <div className="flex justify-between">
                                        <span>SubTotal</span>
                                        <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-orange-600">
                                        <span>Discount</span>
                                        <span className="font-bold">-${discount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                                        <span>Total</span>
                                        <span className="text-base font-black text-[#24523e]">${orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#24523e] hover:bg-[#1a3d2e] text-white text-xs font-bold py-3.5 rounded-md transition flex items-center justify-center gap-2 tracking-wider uppercase cursor-pointer disabled:opacity-50">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Establishing Gateways...
                                        </>
                                    ) : (
                                        "Proceed to Checkout"
                                    )}
                                </button>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                        <MapPin size={15} className="text-gray-500" />
                                        Delivery Address
                                    </h2>
                                </div>

                                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                    {addresses.map((addr) => {
                                        const isSelected = selectedAddressId === addr.id;
                                        return (
                                            <div
                                                key={addr.id}
                                                onClick={() => setSelectedAddressId(addr.id)}
                                                className={`p-3 border rounded-md cursor-pointer transition text-left flex items-start gap-3 ${isSelected ? "border-[#24523e] bg-[#24523e]/5" : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    checked={isSelected}
                                                    onChange={() => setSelectedAddressId(addr.id)}
                                                    className="mt-1 accent-[#24523e] cursor-pointer"
                                                />
                                                <div className="text-xs">
                                                    <p className={`font-bold ${isSelected ? "text-[#24523e]" : "text-gray-900"}`}>{addr.name}</p>
                                                    <p className="text-gray-500 mt-0.5">{addr.street}</p>
                                                    <p className="text-gray-400 mt-0.5">{addr.cityStateZip}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {!showAddressForm ? (
                                    <button
                                        onClick={() => setShowAddressForm(true)}
                                        className="w-full border border-dashed border-gray-300 hover:border-[#24523e] text-gray-600 hover:text-[#24523e] text-[11px] font-bold py-2 rounded-md transition uppercase tracking-wider cursor-pointer text-center"
                                    >
                                        + Add New Address
                                    </button>
                                ) : (
                                    <form onSubmit={handleAddAddress} className="space-y-2 border-t border-gray-100 pt-3 text-left">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={newAddress.name}
                                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                            className="w-full border border-gray-200 rounded-md p-2 text-xs focus:outline-[#24523e]"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Street / Apt Location"
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                            className="w-full border border-gray-200 rounded-md p-2 text-xs focus:outline-[#24523e]"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="City, State, Zipcode"
                                            value={newAddress.cityStateZip}
                                            onChange={(e) => setNewAddress({ ...newAddress, cityStateZip: e.target.value })}
                                            className="w-full border border-gray-200 rounded-md p-2 text-xs focus:outline-[#24523e]"
                                            required
                                        />
                                        <div className="flex gap-2 pt-1">
                                            <button type="submit" className="flex-1 bg-[#24523e] text-white text-[10px] font-bold py-2 rounded-md uppercase tracking-wider transition cursor-pointer text-center">
                                                Save Option
                                            </button>
                                            <button type="button" onClick={() => setShowAddressForm(false)} className="flex-1 bg-gray-100 text-gray-500 text-[10px] font-bold py-2 rounded-md uppercase tracking-wider transition cursor-pointer text-center">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}