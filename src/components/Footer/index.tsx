"use client";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useStrapi } from "@/hooks/useStrapi";
import { useMemo } from "react";

export default function Footer() {
  const { data } = useStrapi("categories");
  const { data: products } = useStrapi("products", {
    field: ["id", "title", "slug", "documentId"],
    sort: ["createdAt:desc"],
    pagination: { page: 1, pageSize: 10 },
  });

  const categories = data?.data || [];
  const productsData = products?.data || [];

  const footerLinks = useMemo(
    () => [
      {
        title: "Products",
        links: productsData.map((product: any) => ({
          name: product.name,
          href: `/products/${product.documentId}`,
        })),
      },
      {
        title: "Categories",
        links: categories.map((category: any) => ({
          name: category.name,
          href: `/products?category=${category.slug}`,
        })),
      },
    ],
    [categories, productsData]
  );

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-background/80">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-background/50 hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-background/80">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+917693017906" className="flex items-center gap-2.5 text-background/50 hover:text-primary text-sm transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 7693017906</span>
              </a>
              <a href="mailto:denzmuscle@gmail.com" className="flex items-center gap-2.5 text-background/50 hover:text-primary text-sm transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>denzmuscle@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/30 text-xs text-center sm:text-left">
            All MuscleDenz products are manufactured at FSSAI approved
            manufacturing facilities and are not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p className="text-background/30 text-xs whitespace-nowrap">
            &copy; {new Date().getFullYear()} MuscleDenz
          </p>
        </div>
      </div>
    </footer>
  );
}
