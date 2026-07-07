"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import SideMenu from "./SideMenu";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden flex items-center">
            <button
                onClick={() => setIsOpen(true)}
                className="text-shop-dark hover:text-shop-orange hover-effect cursor-pointer p-1"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Side Menu Mount Controller */}
            <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}