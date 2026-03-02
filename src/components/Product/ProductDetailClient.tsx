"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
} from "lucide-react";
import type { ProductResType } from "@/types/product";
import { currency } from "@/lib/currency";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hook";
import { addItemsToCart } from "@/redux/actions/cart-actions";

interface ProductDetailClientProps {
  product: ProductResType;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { data } = useSession();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const images =
    product.images || (product.thumbnail ? [product.thumbnail] : []);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + change)));
  };

  const handleBuyNow = () => {
    if (!data?.user.id) {
      localStorage.setItem(
        "redirectRoute",
        JSON.stringify(`/checkout/${product.documentId}`)
      );
      window.location.href = "/login";
      return;
    }
    window.location.href = `/checkout/${product.documentId}`;
  };

  const addToCart = () => {
    dispatch(addItemsToCart(product, quantity));
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              {images.length > 0 ? (
                <Image
                  //@ts-ignore
                  src={
                    //@ts-ignore
                    images[selectedImageIndex]?.url ? images[selectedImageIndex]?.url :
                    "/placeholder.svg?height=600&width=600"
                  }
                  alt={`${product?.name} - Premium Fitness Supplement`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">
                    No image available
                  </span>
                </div>
              )}
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image: any, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                    aria-label={`View image ${index + 1} of ${product.name}`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <article className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product?.category?.name}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 text-balance">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {currency(discountedPrice)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    {currency(product.price)}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-sm text-green-600">
                  You save {currency(product.price - discountedPrice)}
                </p>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product?.tags?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Collection Type */}
            <div>
              <Badge variant="secondary" className="capitalize">
                {product?.collectionType?.replace("-", " ")}
              </Badge>
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 p-0"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={product.stock === 0}
                  onClick={handleBuyNow}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Now - {currency(Number(discountedPrice))}
                </Button>
              </div>
            </div>

            {/* Product Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold mb-1">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">
                    On orders over {currency(50)}{" "}
                  </p>
                </CardContent>
              </Card>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
