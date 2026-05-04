import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
