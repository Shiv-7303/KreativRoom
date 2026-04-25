import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "KreativRoom | Premium Video Editing & Personal Branding",
  description: "We handle the scripting, editing, and strategy so you can focus on closing deals and coaching clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} antialiased bg-grid min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
