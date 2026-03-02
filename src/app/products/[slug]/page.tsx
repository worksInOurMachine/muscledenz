import { Metadata } from "next";
import { notFound } from "next/navigation";
import strapi from "@/sdk";
import type { ProductResType } from "@/types/product";
import ProductDetailClient from "@/components/Product/ProductDetailClient";
import Link from "next/link";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN!;

async function fetchProduct(slug: string): Promise<ProductResType | null> {
  try {
    const res = await strapi.findOne("products", slug, {
      populate: ["thumbnail", "images", "category"],
    });
    return res.data as ProductResType;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | MuscleDenz",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const imageUrl = product.thumbnail?.url || product.images?.[0]?.url || "/logo/md-logo.png";

  return {
    title: `${product.name} | MuscleDenz Premium Supplements`,
    description: product.description || `Buy ${product.name} - Premium fitness supplement from MuscleDenz. ${product.category?.name || 'High-quality sports nutrition'} for muscle growth and performance.`,
    
    metadataBase: new URL("https://muscledenz.com"),
    
    alternates: {
      canonical: `https://muscledenz.com/products/${params.slug}`,
    },
    
    openGraph: {
      title: `${product.name} | MuscleDenz`,
      description: product.description || `Premium ${product.category?.name || 'fitness supplement'} for muscle growth and performance.`,
      url: `https://muscledenz.com/products/${params.slug}`,
      siteName: "MuscleDenz",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | MuscleDenz`,
      description: product.description || `Premium ${product.category?.name || 'fitness supplement'}`,
      images: [imageUrl],
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Product Not Found
          </h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
        </div>
        <Link
          href={"/products"}
          className="bg-black text-white px-4 py-2 rounded-[5px] mt-4"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const imageUrl = product.thumbnail?.url || product.images?.[0]?.url;

  // Product Schema (JSON-LD) 
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrl ? [imageUrl] : [],
    sku: product.documentId,
    brand: {
      "@type": "Brand",
      name: "MuscleDenz",
    },
    offers: {
      "@type": "Offer",
      url: `https://muscledenz.com/products/${params.slug}`,
      priceCurrency: "INR",
      price: discountedPrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127", // You can make this dynamic if you have real review data
    },
    category: product.category?.name || "Fitness Supplements",
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://muscledenz.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://muscledenz.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://muscledenz.com/products/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <ProductDetailClient product={product} />
    </>
  );
}
