import ImageSlider from '@/components/ImageSlider';
import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';
import ProductListings from '@/components/Product';
import TestimonialsCarousel from '@/components/Testimonials/TestimonialsCarousel';
import Loading from './loading';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, Leaf } from 'lucide-react';

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
        url: "/logo/md-logo.png",
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
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}

function SectionHeader({ title, subtitle, align = 'left' }: { title: string; subtitle?: string; align?: 'left' | 'center' }) {
  if (align === 'center') {
    return (
      <div className="text-center space-y-4 mb-16 animate-reveal">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85]">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? "text-primary italic" : ""}>{word} </span>
          ))}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto font-medium">{subtitle}</p>
        )}
        <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-primary" />
      </div>
    );
  }

  return (
    <div className="mb-10 animate-reveal">
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-base sm:text-lg mt-4 font-medium max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
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
    <main className="min-w-full overflow-x-hidden">
      {/* ─── Hero Slider ─── */}
      <section className="relative px-2 md:px-4 pt-4">
        <div className=" overflow-hidden shadow-2xl shadow-black/20">
          <ImageSlider top_banners={homePageData.top_banners} />
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Shield size={24} />, title: "FSSAI Certified", desc: "Pure & Safe Formulas" },
            { icon: <Truck size={24} />, title: "Free Shipping", desc: "On orders above ₹999" },
            { icon: <Leaf size={24} />, title: "100% Vegan", desc: "Plant-powered options" },
            { icon: <ArrowRight size={24} />, title: "Track Order", desc: "Live updates" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 group animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-border/50">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-sm uppercase tracking-wider">{item.title}</p>
                <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About Our Products (Image Grid) ─── */}
      <section className="py-10 md:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Beyond The Limits"
            subtitle="FSSAI-certified sports nutrition — designed for performance, backed by science."
            align="center"
          />
        </div>
        <ImageLayoutGrid about_us={homePageData.about_images} />
      </section>

      {/* ─── Product Sections ─── */}
      <div className="space-y-20 md:space-y-36 pb-32">
        {data.trending?.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <SectionHeader title="Trending Now" subtitle="The absolute favorites from our community right now." />
            <div className="mt-12">
              <ProductListings title="" products={data.trending} />
            </div>
          </section>
        )}

        {data.popular?.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <SectionHeader title="Popular Products" subtitle="Top-rated formulas battle-tested for real results." />
            <div className="mt-12">
              <ProductListings title="" products={data.popular} />
            </div>
          </section>
        )}

        {/* ─── Mid-Page CTA ─── */}
        <section className="relative md:h-[450px] h-[250px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 skew-y-3 -translate-y-12" />
          <div className="relative z-10 text-center space-y-8 px-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Ready to <span className="text-primary italic">Transform?</span>
            </h2>
            <Link href="/products" className="btn-premium group">
              Shop All Products 
            </Link>
          </div>
        </section>


        {data.justLaunched?.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <SectionHeader title="Just Launched" subtitle="The latest innovations in sports nutrition." />
            <div className="">
              <ProductListings title="" products={data.justLaunched} />
            </div>
          </section>
        )}

        {data.ayurveda?.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <SectionHeader title="Ayurveda" subtitle="Ancient Ayurvedic wisdom meets modern performance science." />
            <div className="mt-12">
              <ProductListings title="" products={data.ayurveda} />
            </div>
          </section>
        )}
      </div>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-32 bg-foreground text-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,0,0,0.1),transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-20 animate-reveal">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-4">
              Real <span className="text-primary italic">Results</span>
            </h2>
            <p className="text-background/60 text-lg md:text-xl max-w-2xl mx-auto font-medium italic">
              "We don't sell supplements. We provide the fuel for your transformation."
            </p>
          </div>
          <TestimonialsCarousel testimonials={homePageData.reviews} />
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 bg-background relative border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-muted p-12 md:p-20 rounded-[3rem] border border-border/50 shadow-xl">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Get <span className="text-primary italic">MuscleDenz</span> Now
              </h2>
              <p className="text-muted-foreground text-lg font-medium max-w-md">
                Don't settle for mediocre. Fuel your body with the quality it deserves.
              </p>
            </div>
            <Link href="/products" className="btn-premium group flex-shrink-0">
               Go to Shop <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <section className="overflow-hidden py-12">
        <SlidingText
          velocity={60}
          className="text-foreground/[1] font-black uppercase"
          texts={[
            <h1 key={1} className="text-[4rem] md:text-[16rem] leading-none whitespace-nowrap tracking-tighter">
             &nbsp; MUSCLE<span className="text-red-500">DENZ</span>
            </h1>,
          ]}
        />
      </section>
    </main>
  );
}
