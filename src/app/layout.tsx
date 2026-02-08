import Footer from "@/components/Footer";
import Navbar from "@/components/Header/Navbar";
import AuthProvider from "@/components/Provider/provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { authOptions } from "../../auth";
import "./globals.css";
import { QueryProviders } from "@/components/Provider/query-provider";
import { ReduxProviders } from "@/redux/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "MuscleDenz",
    template: "%s | MuscleDenz",
  },

  description:
    "MuscleDenz is a premium fitness and sports nutrition brand focused on quality supplements that support performance, strength, and recovery.",

  metadataBase: new URL("https://muscledenz.com"),

  icons: {
    icon: "/logo/md-logo.png",
    shortcut: "/logo/md-logo.png",
    apple: "/logo/md-logo.png",
  },

  alternates: {
    canonical: "https://muscledenz.com",
  },

  openGraph: {
    title: "MuscleDenz",
    description:
      "Premium fitness and sports nutrition brand built for performance and recovery.",
    siteName: "MuscleDenz",
    url: "https://muscledenz.com",
    type: "website",
    images: [
      {
        url: "/logo/md-logo.png", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "MuscleDenz Sports Nutrition Brand",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MuscleDenz",
    description:
      "Premium fitness and sports nutrition brand focused on quality and performance.",
    images: ["/logo/md-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  themeColor: "#008ED6",

  category: "Health & Fitness",

  other: {
    keywords:
      "muscledenz, fitness supplements, sports nutrition, whey protein, muscle building supplements",
  },
};

function SearchBarFallback() {
  return (
    <div className="flex justify-center items-center w-full h-fit">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-91M59524XN"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-91M59524XN');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProviders>
          <AuthProvider session={session}>
            <QueryProviders>
              <Suspense fallback={<SearchBarFallback />}>
                <Navbar />
              </Suspense>
              <NuqsAdapter>{children}</NuqsAdapter>
              <Footer />
              <Toaster />
            </QueryProviders>
          </AuthProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
