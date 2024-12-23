import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

import { Inter } from "next/font/google";
import "../globals.css";
import { CustomNavigationMenu } from "@/components/NavigationMenu";
import { Toaster } from "@/components/ui/toaster";
import { ReactElement } from "react";
import { headers } from "next/headers";
import { routesWithOutNaVbAR } from "@/constants";
import Footer from "@/components/Footer";
import { CartProvider } from "@/providers/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: ReactElement }) {
  const headersList = headers();
  // read the custom x-url header
  const headerUrl = headersList.get("referer") || "";
  console.log(
    headerUrl,
    "headddddd",
    headersList.get("referer"),
    routesWithOutNaVbAR.some((route: string) => route.includes(headerUrl))
  );
  return (
    <section>
      <CartProvider>
        <>
          <CustomNavigationMenu />
          {children}
          <Toaster />
          <Footer />
        </>
      </CartProvider>
    </section>
  );
}
