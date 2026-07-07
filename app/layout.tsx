import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bazaar | Online Store",
  description: "A fully functional modern full-stack e-commerce store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased bg-white">
          {/* Clean view area container for all app pages */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}