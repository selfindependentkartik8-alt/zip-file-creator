import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://zipfilecreator.krishaiworks.com"
  ),

  title: "ZIP File Creator | Create ZIP Files Online",

  description:
    "Create ZIP files online quickly and easily with the free ZIP File Creator by KrishAIWorks. Compress and download multiple files as a single ZIP archive.",

  keywords: [
    "ZIP File Creator",
    "Create ZIP File",
    "ZIP Creator Online",
    "Online ZIP File Creator",
    "Free ZIP File Creator",
    "Create ZIP Online",
    "Make ZIP File",
    "ZIP File Maker",
    "Compress Files Online",
    "File Compression Tool",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical: "https://zipfilecreator.krishaiworks.com/",
  },

  openGraph: {
    title: "ZIP File Creator | KrishAIWorks",
    description:
      "Create ZIP files online quickly and easily with the free ZIP File Creator by KrishAIWorks.",
    url: "https://zipfilecreator.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "ZIP File Creator | KrishAIWorks",
    description:
      "Create and download ZIP files online quickly and easily.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}