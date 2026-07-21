// app/api/health/route.ts
// CREATE THIS FILE NOW!

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // ✅ Check critical env vars are present
        const checks = {
            stripe: !!process.env.STRIPE_SECRET_KEY,
            clerk: !!process.env.CLERK_SECRET_KEY,
            sanity: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        }

        const allHealthy = Object.values(checks).every(Boolean)

        return NextResponse.json(
            {
                status: allHealthy ? 'ok' : 'degraded',
                timestamp: new Date().toISOString(),
                service: 'fashion-hub',
                environment: process.env.NODE_ENV,
                checks,
            },
            {
                status: allHealthy ? 200 : 200, // Still 200 so K8s doesn't restart
                headers: {
                    'Cache-Control': 'no-store, no-cache',
                }
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                timestamp: new Date().toISOString(),
                service: 'fashion-hub',
            },
            { status: 500 }
        )
    }
}