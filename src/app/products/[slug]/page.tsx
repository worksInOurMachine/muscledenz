"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  Dumbbell
} from "lucide-react";
import type { ProductResType } from "@/types/product";
import strapi from "@/sdk";
import { currency } from "@/lib/currency";
import Loading from "../../loading";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const fetchProduct = async (slug: string): Promise<ProductResType> => {
  const res = await strapi.findOne("products", slug, {
    populate: ["thumbnail", "images", "category"],
  });
  return res.data as ProductResType;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug),
  });

  if (isLoading) return <Loading />;

  if (error || !product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-primary mb-6">
          <AlertCircle size={40} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Product Not Found</h1>
        <p className="text-muted-foreground font-medium mb-8 max-w-md">
          The supplement you're looking for might have been retired or the link is incorrect.
        </p>
        <Link href="/products" className="btn-premium">
          Browse All Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const images: any = product.images || (product.thumbnail ? [product.thumbnail] : []);

  return (
    <main className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {/* ─── Breadcrumb/Header ─── */}
      <div className="bg-foreground text-background py-8 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-background/40 mb-4 animate-reveal">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* ─── Product Visuals (Left) ─── */}
          <div className="lg:col-span-7 space-y-6 animate-reveal">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted/30 border border-border/50 group shadow-2xl shadow-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={images[selectedImageIndex]?.url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {product.discount > 0 && (
                  <Badge className="bg-primary text-white font-black px-4 py-1.5 rounded-lg border-none text-sm shadow-xl animate-reveal">
                    {product.discount}% OFF
                  </Badge>
                )}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-success/10 text-success text-[10px] font-black uppercase tracking-widest border border-success/20 backdrop-blur-md">
                   <CheckCircle2 size={12} strokeWidth={3} />
                   <span>Authentic</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-primary scale-105 shadow-lg shadow-primary/20"
                        : "border-border/50 opacity-60 hover:opacity-100 hover:border-primary/30"
                    }`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info (Right) ─── */}
          <div className="lg:col-span-5 space-y-10 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border-primary/30 text-primary">
                  {product?.category?.name || "Premium Supplement"}
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold ml-1 text-muted-foreground whitespace-nowrap">4.9 (High-Rated)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-none text-foreground">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck size={12} className="text-primary" />
                  FSSAI Certified
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <Activity size={12} className="text-primary" />
                  Lab Tested
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-8 rounded-[2rem] bg-muted/40 border border-border/50 space-y-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <TrendingUp size={100} strokeWidth={3} />
               </div>
               
               <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black tracking-tighter text-foreground">
                  {currency(discountedPrice)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through font-bold">
                    {currency(product.price)}
                  </span>
                )}
              </div>
              
              {product.discount > 0 && (
                <div className="inline-flex items-center gap-2 text-success font-black text-xs uppercase tracking-widest">
                  <Zap size={14} className="fill-success" />
                  Instant Saving of {currency(product.price - discountedPrice)}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/40">Product Objective</h3>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
                "{product.description}"
              </p>
            </div>

            {/* Action Section */}
            <div className="space-y-6 pt-6">
              {product?.ecomUrl ? (
                <a
                  href={product.ecomUrl}
                  target="_blank"
                  className="btn-premium w-full text-center flex items-center justify-center gap-3 text-lg py-6 group"
                >
                  <Zap size={22} className="transition-transform group-hover:scale-125 group-hover:text-amber-400" />
                  Buy Now — {currency(discountedPrice)}
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </a>
              ) : (
                <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20 text-center">
                  <p className="font-black uppercase tracking-widest text-destructive text-sm">
                    Currently Unavailable
                  </p>
                </div>
              )}

              {/* Micro USPs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
                   <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/50">
                     <Truck size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Pan-India</p>
                     <p className="text-xs font-bold text-foreground">Fast Delivery</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
                   <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/50">
                     <RotateCcw size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Easy Process</p>
                     <p className="text-xs font-bold text-foreground">Hassle-Free Returns</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Specs / Tags */}
            {product?.tags?.length > 0 && (
              <div className="space-y-4 pt-10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40">Key Performance Indicators</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <div key={index} className="px-4 py-2 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-widest transition-transform hover:scale-105">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ─── CTA Footer Section ─── */}
      {/* <section className="mt-20 py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,0,0.15),transparent)] opacity-50" />
        <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
           <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-primary mx-auto mb-10 border border-primary/30">
             <Dumbbell size={40} />
           </div>
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
             Don't Settle For <br />
             <span className="text-primary italic">Medio-core.</span>
           </h2>
           <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12">
             Fuel your transformation with MuscleDenz — the honest nutrition for those who train like they mean it.
           </p>
           <Link href="/products" className="btn-premium">
             Explore More Formulas <ArrowRight size={20} />
           </Link>
        </div>
      </section> */}
    </main>
  );
}
