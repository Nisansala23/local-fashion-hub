import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are completely public (anyone can view them)
const isPublicRoute = createRouteMatcher([
    "/",
    "/shop(.*)",
    "/blog(.*)",
    "/hot-deal(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
    // If the user tries to access a protected route (like /cart or /orders), enforce login
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API and TRPC routes
        '/(api|trpc)(.*)',
        // The mandatory Next.js proxy matcher path for Clerk handshakes
        '/__clerk/:path*',
    ],
};