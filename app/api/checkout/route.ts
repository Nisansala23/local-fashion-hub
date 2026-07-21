// app/api/checkout/route.ts

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// ✅ Validate cart item structure
interface CartItem {
    _id: string
    name?: string
    imageUrl?: string
    slug?: string
    price?: number
    quantity?: number
}

// ✅ Initialize Stripe once at module level
// It will throw at RUNTIME if key missing - not at build time
function getStripeClient(): Stripe {
    const secretKey = process.env.STRIPE_SECRET_KEY

    // ✅ Only throw at runtime, not build time
    if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not configured')
    }

    return new Stripe(secretKey, {

        typescript: true,
    })
}

// ✅ Input validation helper
function validateCartItems(items: unknown): CartItem[] {
    if (!Array.isArray(items)) {
        throw new Error('cartItems must be an array')
    }

    if (items.length === 0) {
        throw new Error('Cart is empty')
    }

    if (items.length > 100) {
        throw new Error('Too many items in cart')
    }

    return items.map((item, index) => {
        if (!item._id) {
            throw new Error(`Item at index ${index} missing _id`)
        }
        if (item.price !== undefined && item.price < 0) {
            throw new Error(`Item at index ${index} has invalid price`)
        }
        return item as CartItem
    })
}

export async function POST(req: Request) {
    try {
        // ✅ Parse request body safely
        let body
        try {
            body = await req.json()
        } catch {
            return NextResponse.json(
                { error: 'Invalid request body' },
                { status: 400 }
            )
        }

        const { cartItems } = body

        // ✅ Validate cart items
        let validatedItems: CartItem[]
        try {
            validatedItems = validateCartItems(cartItems)
        } catch (error) {
            return NextResponse.json(
                { error: error instanceof Error ? error.message : 'Invalid cart' },
                { status: 400 }
            )
        }

        // ✅ Get Stripe client - throws if key missing
        let stripe: Stripe
        try {
            stripe = getStripeClient()
        } catch {
            console.error('🚨 Stripe configuration error')
            return NextResponse.json(
                { error: 'Payment service unavailable' },
                { status: 503 }
            )
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

        // ✅ Build line items with validation
        const lineItems = validatedItems.map((item) => {
            const imageUrls = item.imageUrl?.startsWith('http')
                ? [item.imageUrl]
                : []

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name || 'Store Item',
                        images: imageUrls,
                        metadata: {
                            product_id: item._id,
                            slug: item.slug || '',
                        },
                    },
                    // ✅ Safe price calculation
                    unit_amount: Math.round(Math.max(0, item.price || 0) * 100),
                },
                quantity: Math.max(1, item.quantity || 1),
            }
        })

        // ✅ Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${baseUrl}/success?orderNumber=${crypto.randomUUID()}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cart`,
            // ✅ Added useful metadata
            metadata: {
                itemCount: validatedItems.length.toString(),
            },
        })

        // ✅ Validate session URL exists
        if (!session.url) {
            throw new Error('Failed to create checkout session URL')
        }

        return NextResponse.json({ url: session.url })

    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : 'Stripe initiation failed'

        console.error('🚨 STRIPE ERROR:', message)

        return NextResponse.json(
            { error: message },
            { status: 500 }
        )
    }
}