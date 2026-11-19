import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kashinirmalheights.com"),
  title: "Kashi Nirmal Heights | Ultra-Luxury Residences in Transport Nagar, Varanasi",
  description:
    "Discover Kashi Nirmal Heights – Varanasi's most prestigious residential landmark offering 2, 3 & 4 BHK luxury residences on full paid-up freehold land in Transport Nagar. Designed by Hafeez Contractor.",
  keywords: [
    "Kashi Nirmal Heights",
    "Luxury flats in Varanasi",
    "Transport Nagar Varanasi apartments",
    "2 BHK 3 BHK 4 BHK Varanasi",
    "Hafeez Contractor Varanasi",
    "VDA approved luxury apartments",
  ],
  openGraph: {
    title: "Kashi Nirmal Heights | An Elevated Address. A Timeless Legacy.",
    description:
      "Exclusive 2, 3 & 4 BHK luxury residences in the first government-planned township of Varanasi – Transport Nagar.",
    url: "https://kashinirmalheights.com",
    siteName: "Kashi Nirmal Heights",
    images: [
      {
        url: "/images/assets/hero_tower.jpg",
        width: 1200,
        height: 630,
        alt: "Kashi Nirmal Heights Luxury Tower",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#F8F5EF] text-[#24211E] selection:bg-[#C9A45C] selection:text-[#1A0A05]">
        {children}
      </body>
    </html>
  );
}
