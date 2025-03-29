"use client";

import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/config/products.config";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
import { ProductResType } from "@/types/product";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductResType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState<string[] | []>([]);
  const defaultArr = [
    "https://img.etimg.com/photo/msid-77716162,imgsize-112043/1200x800px_02(2).jpg",
    "https://img5.hkrtcdn.com/27451/prd_2745004-MuscleBlaze-100-Whey-Protein-Supplement-Powder-with-Digestive-Enzyme-4.4-lb-57-Servings-Rich-Milk-Chocolate_o.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe4Q9d4iCfYMPqya9tQ-rHivBoSR84FeQ1A&s",
  ];

  //whatsapp chat

  const openWhatsAppChat = () => {
    const imageUrl = "https://img8.hkrtcdn.com/35862/pck_3586117_c_m.jpg";
    const message =  product && `Hello, I'm interested in purchasing:\n\n*${product.name}*\n\nPrice: ${product.discount > 0
      ? `₹${(product.price * (1 - product.discount / 100)).toFixed(2)} (${product.discount}% OFF)`
      : `₹${product.price}`}\n\nDescription: ${product.description}\n\nProduct Image: ${imageUrl}\n\nPlease provide more information about this product.`;

    const encodedMessage =  encodeURIComponent(message || '');
    const phoneNumber = "917617290091";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (resolvedParams && resolvedParams.slug) {
      const product =
        products.find((product) => product.id === resolvedParams.slug) || null;
      setProduct(product);
      //append product images here
      setImages(defaultArr);
    }
  }, [resolvedParams]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl  ">
      {/* {
        product && (
          JSON.stringify(product)
        )
      } */}
      <div className="mb-6 ">
        <nav className="flex text-sm">
          <Link href="/" className="text-muted-foreground hover:text-red-600">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-red-600"
          >
            products
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">{resolvedParams?.slug}</span>
        </nav>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 ">
        {/* Product Images */}
        <div className="space-y-4 md:col-span-2">
          <div className="overflow-hidden h-[300px] sm:h-[500px] rounded-lg border bg-background">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt="Premium Whey Protein"
              width={400}
              height={400}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-red-600" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 md:col-span-3">
          <div>
            <Badge className="mb-2 bg-red-600 text-white">Best Seller</Badge>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? "fill-red-600 text-red-600"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                4.0 (128 reviews)
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">
                $
                {product &&
                  calculateDiscountedPrice({
                    price: product?.price,
                    discountPercentage: product?.discount,
                  })}
              </span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product?.price}
              </span>
              {product && Number(product.discount) > 0 && (
                <Badge
                  variant="outline"
                  className="ml-2 text-red-600 border-red-600"
                >
                  Save {product?.discount}%
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm py-2 font-bold text-pretty text-muted-foreground">
             {
              product?.description
             }
            </p>
            <br />
            <div className="space-y-6 lg:col-span-3">
              <Tabs defaultValue="description">
                {/* <TabsList className="grid w-full grid-cols-3"> */}
                  {/* <TabsTrigger value="description">Description</TabsTrigger> */}
                  {/* <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
                {/* </TabsList> */}
                {/* <TabsContent value="description" className="pt-4"> */}
                  {/* <div className="space-y-4"> */}
                    {/* {product?.description} */}
                    {/* <h3 className="text-xl font-bold">Premium Whey Protein Isolate</h3>
                <p>
                  Our Premium Whey Protein Isolate is designed to support muscle growth and recovery. Each serving
                  delivers 25g of high-quality protein with minimal fat and carbohydrates, making it the perfect
                  supplement for athletes and fitness enthusiasts.
                </p>
                <h4 className="text-lg font-semibold">Key Benefits</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>25g of high-quality protein per serving</li>
                  <li>Low in fat and carbohydrates</li>
                  <li>Supports muscle growth and recovery</li>
                  <li>Mixes easily with water or milk</li>
                  <li>Delicious taste in multiple flavors</li>
                </ul>
                <h4 className="text-lg font-semibold">How to Use</h4>
                <p>
                  Mix one scoop (30g) with 8-10 oz of cold water or your preferred beverage. Consume 1-2 servings daily,
                  preferably post-workout or between meals to support your protein intake goals.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ingredients">
                    <AccordionTrigger>Ingredients</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Whey Protein Isolate, Natural and Artificial Flavors, Lecithin, Acesulfame Potassium, Sucralose.
                        Contains milk and soy ingredients.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Free shipping on orders over $50. Orders typically ship within 1-2 business days. Unopened
                        products can be returned within 30 days for a full refund.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}
                  {/* </div> */}
                {/* </TabsContent> */}
                <TabsContent value="nutrition" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Nutrition Facts</h3>
                    <div className="rounded-lg border">
                      <div className="border-b p-4">
                        <p className="text-sm">Serving Size: 1 Scoop (30g)</p>
                        <p className="text-sm">Servings Per Container: 30</p>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="p-3 text-left">
                              Amount Per Serving
                            </th>
                            <th className="p-3 text-right">% Daily Value*</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3">Calories 120</td>
                            <td className="p-3 text-right"></td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Total Fat 1g</td>
                            <td className="p-3 text-right">2%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 pl-6">Saturated Fat 0.5g</td>
                            <td className="p-3 text-right">3%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Cholesterol 5mg</td>
                            <td className="p-3 text-right">2%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Sodium 50mg</td>
                            <td className="p-3 text-right">2%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Total Carbohydrate 2g</td>
                            <td className="p-3 text-right">1%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 pl-6">Dietary Fiber 0g</td>
                            <td className="p-3 text-right">0%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 pl-6">Sugars 1g</td>
                            <td className="p-3 text-right"></td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Protein 25g</td>
                            <td className="p-3 text-right">50%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Calcium 120mg</td>
                            <td className="p-3 text-right">12%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Iron 0mg</td>
                            <td className="p-3 text-right">0%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Potassium 150mg</td>
                            <td className="p-3 text-right">4%</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="p-4">
                        <p className="text-xs">
                          * Percent Daily Values are based on a 2,000 calorie
                          diet. Your daily values may be higher or lower
                          depending on your calorie needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Customer Reviews</h3>
                      <Button className="bg-red-600 text-white hover:bg-red-500">
                        Write a Review
                      </Button>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="md:w-1/3">
                        <div className="rounded-lg border p-4">
                          <div className="mb-2 text-center">
                            <div className="text-4xl font-bold">4.0</div>
                            <div className="flex justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < 4
                                      ? "fill-red-600 text-red-600"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              Based on 128 reviews
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="w-1/4 text-sm">5 stars</span>
                              <div className="relative h-2 w-3/4 rounded-full bg-muted">
                                <div className="absolute h-2 w-[65%] rounded-full bg-red-600"></div>
                              </div>
                              <span className="ml-2 w-1/4 text-right text-sm">
                                65%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-1/4 text-sm">4 stars</span>
                              <div className="relative h-2 w-3/4 rounded-full bg-muted">
                                <div className="absolute h-2 w-[20%] rounded-full bg-red-600"></div>
                              </div>
                              <span className="ml-2 w-1/4 text-right text-sm">
                                20%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-1/4 text-sm">3 stars</span>
                              <div className="relative h-2 w-3/4 rounded-full bg-muted">
                                <div className="absolute h-2 w-[10%] rounded-full bg-red-600"></div>
                              </div>
                              <span className="ml-2 w-1/4 text-right text-sm">
                                10%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-1/4 text-sm">2 stars</span>
                              <div className="relative h-2 w-3/4 rounded-full bg-muted">
                                <div className="absolute h-2 w-[3%] rounded-full bg-red-600"></div>
                              </div>
                              <span className="ml-2 w-1/4 text-right text-sm">
                                3%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-1/4 text-sm">1 star</span>
                              <div className="relative h-2 w-3/4 rounded-full bg-muted">
                                <div className="absolute h-2 w-[2%] rounded-full bg-red-600"></div>
                              </div>
                              <span className="ml-2 w-1/4 text-right text-sm">
                                2%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 md:w-2/3">
                        {[1, 2, 3].map((review) => (
                          <Card key={review}>
                            <CardContent className="p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                                  <div className="ml-3">
                                    <div className="font-medium">John D.</div>
                                    <div className="text-xs text-muted-foreground">
                                      Verified Buyer
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  2 weeks ago
                                </div>
                              </div>
                              <div className="mb-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < 4
                                        ? "fill-red-600 text-red-600"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <h4 className="mb-1 font-medium">
                                Great protein, mixes well
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                I've been using this protein for about a month
                                now and I'm very happy with it. It mixes well
                                with no clumps and the chocolate flavor is
                                delicious. I've noticed better recovery after my
                                workouts.
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full border-red-600 text-red-600 hover:bg-red-50"
                        >
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* <div>
            <h3 className="font-medium">Flavor</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-full">
                Chocolate
              </Button>
              <Button variant="outline" className="rounded-full bg-red-600 text-white">
                Vanilla
              </Button>
              <Button variant="outline" className="rounded-full">
                Strawberry
              </Button>
              <Button variant="outline" className="rounded-full">
                Cookies & Cream
              </Button>
            </div>
          </div> */}
          {/* 
          <div>
            <h3 className="font-medium">Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-full">
                1 lb (454g)
              </Button>
              <Button variant="outline" className="rounded-full bg-red-600 text-white">
                2 lb (908g)
              </Button>
              <Button variant="outline" className="rounded-full">
                5 lb (2.27kg)
              </Button>
            </div>
          </div> */}

          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none rounded-l-md"
                onClick={decrementQuantity}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="flex h-10 w-12 items-center justify-center text-sm">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none rounded-r-md"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">12</span> in stock
            </div>
          </div> */}

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button
            onClick={openWhatsAppChat}
              className="flex-1 bg-red-600 py-2 sm:-y-0 text-white hover:bg-red-500"
              size="lg"
            >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="white"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Buy Now
            </Button>
            {/* <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button> */}
            {/* <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button> */}
          </div>
        </div>

        {/* Product Details, Nutrition, Reviews Tabs */}
      </div>

      {/* Related Products */}
      {/* <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((product) => (
            <Card key={product} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Related product"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">Premium Creatine Monohydrate</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-red-600 text-red-600" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-muted-foreground">(42)</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium">$29.99</span>
                    <span className="ml-1 text-xs text-muted-foreground line-through">$34.99</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
}
