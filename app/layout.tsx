import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "127.0.0.1:5173";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("127.0.0.1") || host.includes("localhost")
      ? "http"
      : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.jpg", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Patchbay — A live lab for site changes",
    description:
      "A GitHub-backed demo surface for testing file edits, site updates, and live deployments.",
    openGraph: {
      title: "Patchbay",
      description: "A live lab for site changes.",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 675,
          alt: "Patchbay — A live lab for site changes.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Patchbay",
      description: "A live lab for site changes.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
