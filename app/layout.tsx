import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Weightless",
    description: "Antigravity 3D Modelling Interface",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased w-screen h-screen overflow-hidden">
                {children}
            </body>
        </html>
    );
}
