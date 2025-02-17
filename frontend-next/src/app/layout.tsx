import type { Metadata } from "next";
import { Amatic_SC, Chakra_Petch } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const amaticSCBold = Amatic_SC({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Healthy Piggy",
  description: "Generate recipe ideas",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${chakraPetch.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
