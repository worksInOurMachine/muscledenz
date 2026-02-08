import ImageSlider from '@/components/ImageSlider';
import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';
import ProductListings from '@/components/Product';
import TestimonialsCarousel from '@/components/Testimonials/TestimonialsCarousel';
import Loading from './loading';
import dynamic from 'next/dynamic';


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MuscleDenz | Premium Fitness & Muscle Building Supplements",

  description:
    "MuscleDenz is a premium sports nutrition brand offering high-quality fitness supplements to support muscle growth, strength, endurance, and recovery.",

  metadataBase: new URL("https://muscledenz.com"),

  alternates: {
    canonical: "https://muscledenz.com",
  },

  openGraph: {
    title: "MuscleDenz | Premium Fitness Supplements",
    description:
      "Fuel your workouts with clean, high-quality supplements designed for muscle growth, strength, and recovery.",
    url: "https://muscledenz.com",
    siteName: "MuscleDenz",
    type: "website",
    images: [
      {
        url: "/logo/md-logo.png", // ⚠️ Use lifestyle + product image
        width: 1200,
        height: 630,
        alt: "MuscleDenz Premium Fitness Supplements",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MuscleDenz | Premium Fitness Supplements",
    description:
      "High-quality sports nutrition supplements crafted for performance and recovery.",
    images: ["/logo/md-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "Health & Fitness",

  // Optional – keep it CLEAN if you insist
  other: {
    keywords:
      "MuscleDenz, fitness supplements, muscle building supplements, whey protein India, sports nutrition brand",
  },
};

const SlidingText = dynamic(
  () => import('@/components/AnimatedComponent/SlidingText'),
);

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN!;

async function fetchFromStrapi(endpoint: string, query = '') {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}${query}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 }, // ISR (important)
  });

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}

export default async function Home() {
  const [collections, homePage] = await Promise.all([
    fetchFromStrapi('products/collections'),
    fetchFromStrapi('home-page', '?populate=*'),
  ]);

  const data = collections?.data;
  const homePageData = homePage?.data;

  if (!data || !homePageData) return <Loading />;

  return (
    <div className="min-w-full py-5 space-y-5 min-h-full p-1">
      <ImageSlider top_banners={homePageData.top_banners} />

      <div id="training-programs" className="w-full space-y-0">
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 font-bold text-center">
          About Our Products
        </div>
        <ImageLayoutGrid about_us={homePageData.about_images} />
      </div>

      <div className="space-y-10">
        {data.trending?.length > 0 && (
          <ProductListings title="Trending Products" products={data.trending} />
        )}

        {data.popular?.length > 0 && (
          <ProductListings title="Popular Products" products={data.popular} />
        )}

        {data.justLaunched?.length > 0 && (
          <ProductListings title="Just Launched" products={data.justLaunched} />
        )}

        {data.ayurveda?.length > 0 && (
          <ProductListings title="Ayurveda" products={data.ayurveda} />
        )}

        {data.cosmeticsAndSkincare?.length > 0 && (
          <ProductListings
            title="Cosmetics And Skincare"
            products={data.cosmeticsAndSkincare}
          />
        )}

        {data.proteinSupplements?.length > 0 && (
          <ProductListings
            title="Protein Supplements"
            products={data.proteinSupplements}
          />
        )}

        {data.sportsWears?.length > 0 && (
          <ProductListings
            title="Sports Wears"
            products={data.sportsWears}
          />
        )}
      </div>

      <div
        id="testimonials"
        className="py-2 sm:py-5 md:py-10 md:space-y-10 bg-slate-100"
      >
        <div className="text-2xl sm:text-4xl lg:text-5xl text-gray-700 font-bold text-center">
          What Our Customer&apos;s Say
        </div>
        <TestimonialsCarousel testimonials={homePageData.reviews} />
      </div>
      <SlidingText
        velocity={100}
        className="text-black/60"
        texts={[
          <h1 key={1}>
            MUSCLE<span className="text-red-600">DENZ</span>
          </h1>,
        ]}
      />
    </div>
  );
}
