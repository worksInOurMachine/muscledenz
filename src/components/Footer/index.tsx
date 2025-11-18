"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useStrapi } from "@/hooks/useStrapi";
import { useMemo } from "react";

export default function Footer() {
  const { data, isLoading, isError } = useStrapi("categories");
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useStrapi("products", {
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
    <footer className="relative bg-black  text-white pt-16 pb-6 overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-600 pb-4 md:pb-10">
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold text-lg mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link: any, i: number) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-4">Contact Details</h3>
          {/* <div className="flex mb-4">
            <Input
              type="email"
              placeholder="Your Email"
              className="bg-transparent border-gray-700 rounded-r-none focus:ring-yellow-500 text-white"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-l-none">
              Submit
            </Button>
          </div> */}

          <div className="flex items-center gap-2 mb-3 mt-6">
            <Phone className="h-4 w-4" />
            <span className="text-sm">+91 7693017906</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-4 w-4" />
            {/* <span className="text-sm">info@MuscleDenz.com</span> */}
            <a href="mailto:denzmuscle@gmail.com" className="text-sm">
              denzmuscle@gmail.com{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-center mt-6 text-gray-500">
          All MuscleDenz products are manufactured at FSSAI approved
          manufacturing facilities and are not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
