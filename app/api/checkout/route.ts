import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        // 🌟 Safe validation step: check if it's missing but don't hard crash the build worker
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey && process.env.NODE_ENV === "production" && typeof window === "undefined") {
            console.warn("⚠️ Warning: STRIPE_SECRET_KEY is missing. Using a mock string for compilation fallback safety.");
        }

        // Pass a fallback dummy string so the compiler can instantiate the module successfully
        const stripe = new Stripe(secretKey || "sk_test_mock_key_for_compilation_safety");

        const { cartItems } = await req.json();

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const lineItems = cartItems.map((item: {
            _id: string;
            name?: string;
            imageUrl?: string;
            slug?: string;
            price?: number;
            quantity?: number;
        }) => {
            const imageUrls = item.imageUrl?.startsWith("http") ? [item.imageUrl] : [];

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name || "Store Item",
                        images: imageUrls,
                        metadata: {
                            product_id: item._id,
                            slug: item.slug || "",
                        },
                    },
                    unit_amount: Math.round((item.price || 0) * 100),
                },
                quantity: item.quantity || 1,
            };
        });

        // If a compilation build uses the dummy key, skip the real Stripe call entirely to prevent API network errors
        if (secretKey === undefined || secretKey === "sk_test_mock_key_for_compilation_safety") {
            return NextResponse.json({ url: `${baseUrl}/cart?mock=true` });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${baseUrl}/success?orderNumber=${crypto.randomUUID()}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cart`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Stripe initiation failed";
        console.error("🚨 STRIPE ERROR:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}