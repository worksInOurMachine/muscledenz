import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductNotFound() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-64 h-64 md:w-80 md:h-80 -my-10">
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            alt="Product not found illustration"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Product Not Found
          </h1>
          <p className="text-muted-foreground text-lg">
            We couldn't find the nutrition product you were looking for. It may
            have been discontinued or moved to a different category.
          </p>
        </div>

        {/* <div className="w-full max-w-md flex items-center space-x-2">
          <Input type="text" placeholder="Search for products..." className="flex-1" />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div> */}
        <div className="pt-4 md:pt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
        <div className="w-full max-w-4xl pt-4 md:pt-8">
          <h2 className="text-xl font-semibold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard
              title="Vitamins & Supplements"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGiuUKXduenmbsuKuMUhlmKwAmzCRHDsM_A&s"
              href="/categories/vitamins"
            />
            <CategoryCard
              title="Protein Powders"
              image="https://www.protrition.in/cdn/shop/files/Whey-Protein-Vanilla-1KG.png?v=1737096788"
              href="/categories/protein"
            />
            <CategoryCard
              title="Superfoods"
              image="https://articles-1mg.gumlet.io/articles/wp-content/uploads/2019/06/superfoods.jpg?compress=true&quality=80&w=640&dpr=2.6"
              href="/categories/superfoods"
            />
            <CategoryCard
              title="Healthy Snacks"
              image="https://hips.hearstapps.com/hmg-prod/images/chia-pudding-with-kiwi-granola-and-almonds-in-a-jar-royalty-free-image-1642112572.jpg?crop=1.00xw:0.667xh;0.00170xw,0.163xh&resize=980:*"
              href="/categories/snacks"
            />
          </div>
        </div>

        <div className="w-full max-w-4xl pt-8">
          <h2 className="text-xl font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 transition-all">
            <ProductCard
              title="Organic Multivitamin"
              price="$29.99"
              image="https://images.apollo247.in/pub/media/catalog/product/h/o/ho_multivitaminsports_1.jpg"
              href="/products/organic-multivitamin"
            />
            <ProductCard
              title="Plant Protein Blend"
              price="$39.99"
              image="https://images-static.nykaa.com/media/catalog/product/5/c/5cc8310BGREE00000030a_1.jpg?tr=w-500"
              href="/products/plant-protein"
            />
            <ProductCard
              title="Omega-3 Fish Oil"
              price="$24.99"
              image="https://m.media-amazon.com/images/I/61Sa75O4MlL.jpg"
              href="/products/omega-3"
            />
            <ProductCard
              title="Probiotic Complex"
              price="$34.99"
              image="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ncs/ncs57240/y/24.jpg"
              href="/products/probiotic"
            />
          </div>
        </div>

        <div className="pt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group  rounded-lg overflow-hidden  hover:shadow-md border border-gray-100"
    >
      <div className="bg-card rounded-lg p-4 flex flex-col items-center text-center transition-colors hover:bg-accent--">
        <div className="relative w-24 h-24 mb-3">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium group-hover:text-accent-foreground">
          {title}
        </span>
      </div>
    </Link>
  );
}

function ProductCard({
  title,
  price,
  image,
  href,
}: {
  title: string;
  price: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="rounded-lg overflow-hidden transition-all hover:shadow-md border border-gray-100">
        <div className="relative aspect-square bg-accent/10">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm group-hover:text-primary truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{price}</p>
        </div>
      </div>
    </Link>
  );
}
