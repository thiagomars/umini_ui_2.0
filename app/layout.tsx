import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { keywords } from "@/utils/keywords";
import Navbar from "@/components/navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import Footer from "@/sections/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistInter = Inter({
    variable: "--font-geist-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Umini",
    description: "Projetos elétricos que fazem a diferença.",
    authors: [{ name: "Umini", url: "https://umini.com.br" }, { name: "Thiago Marques Sousa", url: "https://martesoftware.com.br" }],
    creator: "Marte Software",
    publisher: "Digital Ocean",
    keywords: keywords,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={`${geistInter.variable} scroll-smooth`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html >
    );
}
