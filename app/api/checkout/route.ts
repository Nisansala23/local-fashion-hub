import { NextResponse } from "next/server";
import Stripe from "stripe";

// 🚀 FIX 1: Remove the hardcoded apiVersion string to let Stripe fall back to your account default
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: undefined as any,
});

export async function POST(req: Request) {
    try {
        const { cartItems } = await req.json();

        // Safety check to ensure the keys are loaded correctly in your terminal
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("❌ STRIPE_SECRET_KEY is missing from .env.local!");
            return NextResponse.json({ error: "Server configuration missing API keys." }, { status: 500 });
        }

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
        }

        // 🚀 FIX 2: Dynamic fallback for BASE_URL to prevent crashes if undefined
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const lineItems = cartItems.map((item: any) => {
            // Safety fallback for empty image strings to prevent Stripe API parameter errors
            const imageUrls = item.imageUrl && item.imageUrl.startsWith("http") ? [item.imageUrl] : [];

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

        // Generate a clean random tracking number string
        const trackingNumber = crypto.randomUUID();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            // 🚀 PASS PARAMS: This appends the unique number onto the URL string that our Success page reads!
            success_url: `${baseUrl}/success?orderNumber=${trackingNumber}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cart`,
        });
        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        // This will print out the EXACT error reason in your VS Code terminal
        console.error("🚨 DETAILED STRIPE ERROR:", error.message || error);
        return NextResponse.json({ error: error.message || "Stripe initiation failed" }, { status: 500 });
    }
}