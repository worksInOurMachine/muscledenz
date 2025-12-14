import Footer from "@/components/Footer";
import Navbar from "@/components/Header/Navbar";
import AuthProvider from "@/components/Provider/provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
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
  title:
    "Muscledenz | High-Protein Recipes, Muscle Building Meals & Fitness Nutrition",
  description:
    "Muscledenz is your trusted hub for high-protein meals, clean diet tips, calorie-surplus bulking meals, fat-burning recipes, and science-based fitness nutrition for lean muscle. Discover healthy meal plans, gym diet guides, protein-rich Indian recipes, and evidence-backed nutrition for beginners and athletes.",
  other: {
    keywords:
      "Muscle Denz, Muscle Denz nutrition, Muscle Denz protein, fitness nutrition, high-protein recipes, clean eating, lean muscle, meal plans, healthy recipes, muscle building, fat-burning meals, energy-boosting meals, protein-rich meals, healthy lifestyle, meal prep, workout nutrition, fitness, nutrition, healthy eating,Muscle Denz, muscledenz, Muscledenz, MuscleDenz, muscel denz,muscle denz,muscle dense,high protein recipes, high protien recipes,protien rich food,gym diet plan,muscle gain diet,lean muscle food,bulking diet,cutting diet,at loss diet,indian high protein food,workout nutrition,meal prep ideas,healthy recipes,bodybuilding meals,protein diet plan,weight gain diet,calorie surplus meals,healthy lifestyle meals,muscel denz,musle denz,protine foods,protien diets,gym protien meals,high protien food",
  },

  icons: {
    icon: "/logo/md-logo.png",
    shortcut: "/logo/md-logo.png",
    apple: "/logo/md-logo.png",
  },
  alternates: {
    canonical: "https://www.muscledenz.com",
  },
  openGraph: {
    title:
      "MuscleDenz | High-Protein Recipes, Muscle Building Meals & Fitness Nutrition",
    description:
      "Explore high-protein meals, fat-loss recipes, healthy meal plans, and science-backed fitness nutrition designed to help you build muscle, burn fat, and stay energized.",
    url: "https://www.muscledenz.com",
    siteName: "Muscledenz",
    images: [
      {
        url: "/logo/md-logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muscle Denz | High-Protein & Muscle-Building Recipes",
    description:
      "High-protein recipes, muscle-building meal plans, fat-burning foods, and clean eating nutrition backed by science. Build lean muscle with Muscle Denz.",
    images: "/logo/md-logo.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#008ED6",
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
        {/*    <Script id="structured-data" type="application/ld+json">
          {`
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.muscledenz.com/#organization",
        "name": "Muscle Denz",
        "url": "https://www.muscledenz.com",
        "logo": "https://www.muscledenz.com/logo/md-logo.png",
        "sameAs": [
          "https://instagram.com/muscledenz",
          "https://www.facebook.com/muscledenz",
          "https://www.twitter.com/muscledenz"
        ]
      },
      {
        "@type": "Brand",
        "@id": "https://www.muscledenz.com/#brand",
        "name": "Muscle Denz",
        "logo": "https://www.muscledenz.com/logo/md-logo.png",
        "url": "https://www.muscledenz.com",
        "description": "High-protein recipes, muscle-building meals, fitness nutrition tips, and clean eating guides for healthy muscle growth.",
        "image": "https://www.muscledenz.com/logo/md-logo.png"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.muscledenz.com/#website",
        "url": "https://www.muscledenz.com",
        "name": "Muscle Denz",
        "publisher": {
          "@id": "https://www.muscledenz.com/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.muscledenz.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.muscledenz.com/#localbusiness",
        "name": "Muscle Denz",
        "image": "https://www.muscledenz.com/logo/md-logo.png",
        "url": "https://www.muscledenz.com",
        "telephone": "+91-7693017906",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "priceRange": "$$",
        "description": "Fitness nutrition brand offering high-protein recipes, muscle-building plans, diet guides, and healthy meal ideas.",
        "servesCuisine": ["Healthy", "High-Protein", "Fitness", "Muscle-Building"],
        "sameAs": [
          "https://instagram.com/muscledenz"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.muscledenz.com/#webpage",
        "url": "https://www.muscledenz.com",
        "name": "Muscle Denz | High-Protein Recipes & Muscle-Building Nutrition",
        "description": "Discover science-backed high-protein recipes, lean muscle meal plans, calorie-surplus diets, and clean eating guides at Muscle Denz.",
        "isPartOf": {
          "@id": "https://www.muscledenz.com/#website"
        },
        "about": {
          "@id": "https://www.muscledenz.com/#organization"
        }
      }
    ]
  }
  `}
        </Script> */}

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
