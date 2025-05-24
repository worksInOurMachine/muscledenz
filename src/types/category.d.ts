export interface CategoryResType {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?:string
  products?: {
    data: ProductType[];
  };
}
