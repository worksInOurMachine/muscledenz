import { CategoryResType } from "./category";

export interface ProductResType {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  thumbnail: string|null;

  stock: number;
  category: CategoryResType;
  tags: string[];
  collectionType:
    | "popular"
    | "trending"
    | "fit-food"
    | "life-style"
    | "just-launched";
  createdAt: string;
  updatedAt: string;
  isVeg: boolean;
}

export interface ProductType {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  collectionType: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    documentId: string;
  };
  thumbnail: {
    id: number;
    name: string;
    url: string;
  };
  images: {
    id: number;
    name: string;
    url: string;
  }[];
  visibility: boolean;
  isVeg: boolean;
  tags: string[];
}
