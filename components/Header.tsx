import Link from "next/link";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import HeaderIcons from "./HeaderIcons";
import MobileMenu from "./MobileMenu";

import { ClerkLoaded, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

// 🚀 FIXED: Re-added the crucial 'async' keyword here
export default async function Header() {
    let user = null;

    try {
        // Now allowed because the parent container is marked async!
        user = await currentUser();
    } catch (error) {
        console.warn("⚠️ Clerk profile handshake failed due to a network delay or proxy block:", error);
        user = null;
    }

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4 hover-effect">
            <Container className="flex items-center justify-between">

                {/* Left Side: Mobile navigation drawer trigger & Premium logo */}
                <div className="flex items-center gap-2.5 w-auto md:w-1/3">
                    <MobileMenu />
                    <Link className="text-xl font-black tracking-widest uppercase text-shop-dark-green hover:text-shop-orange hover-effect" href="/">
                        Bazaar
                    </Link>
                </div>

                {/* Center Navigation Menu (Handles shop/collections routing paths) */}
                <HeaderMenu />

                {/* Right Side: Interactive shopping icons and authentication state */}
                <div className="flex items-center justify-end gap-4 w-auto md:w-1/3">
                    <HeaderIcons />

                    <ClerkLoaded>
                        {user ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <SignInButton mode="modal">
                                <button className="text-xs font-bold uppercase tracking-widest text-shop-dark hover:text-shop-orange bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-xl border border-gray-100 transition duration-200 cursor-pointer">
                                    Login
                                </button>
                            </SignInButton>
                        )}
                    </ClerkLoaded>
                </div>

            </Container>
        </header>
    );
}