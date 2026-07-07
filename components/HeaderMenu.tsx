"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerData } from "@/constants/data";
import { cn } from "@/lib/utils";

export default function HeaderMenu() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-7">
            {headerData.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium capitalize text-shop-gray-dark hover:text-shop-orange hover-effect relative group py-1",
                            isActive && "text-shop-orange"
                        )}
                    >
                        {item.title}
                        {/* Split Underline Sliding Animation Effect */}
                        <span className={cn(
                            "absolute bottom-0 left-1/2 w-0 h-[2px] bg-shop-orange hover-effect group-hover:w-1/2 group-hover:left-0",
                            isActive && "w-1/2 left-0"
                        )} />
                        <span className={cn(
                            "absolute bottom-0 right-1/2 w-0 h-[2px] bg-shop-orange hover-effect group-hover:w-1/2 group-hover:right-0",
                            isActive && "w-1/2 right-0"
                        )} />
                    </Link>
                );
            })}
        </nav>
    );
}