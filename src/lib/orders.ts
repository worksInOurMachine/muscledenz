import strapi from "@/sdk";
import type { OrderResType } from "@/types/order";
import { ProductResType } from "@/types/product";
import { CategoryResType } from "@/types/category";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

type FiltersInput = {
  status?: string | null;
  payment?: string | null;
  userId?: string;
};

function isNumericId(value: string) {
  return /^[0-9]+$/.test(value);
}

function mapStrapiProduct(entity: any): ProductResType {
  if (!entity) {
    return {
      id: "",
      name: "",
      description: "",
      price: 0,
      discount: 0,
      images: [],
      thumbnail: null,
      stock: 0,
      category: { id: "", name: "", slug: "", description: "", image: "" },
      tags: [],
      collectionType: "popular",
      createdAt: "",
      updatedAt: "",
      isVeg: false,
      documentId: "",
    };
  }

  const id =
    entity.id ?? entity.documentId ?? entity.attributes?.documentId ?? "";
  const a = entity.attributes ?? entity;

  const categoryData = a.category?.data ?? a.category;
  const categoryAttrs = categoryData?.attributes ?? categoryData;

  const thumbnailData = a.thumbnail?.data ?? a.thumbnail;
  const thumbnailUrl =
    thumbnailData?.attributes?.url ??
    thumbnailData?.url ??
    (Array.isArray(a.images) && a.images.length ? a.images[0] : null);

  const product: ProductResType = {
    id: (a.id ?? id ?? "").toString(),
    name: a.name ?? "",
    description: a.description ?? "",
    price: Number(a.price ?? 0),
    discount: Number(a.discount ?? 0),
    images: a.images ?? [],
    thumbnail: thumbnailUrl ? { url: thumbnailUrl } : null,
    stock: Number(a.stock ?? 0),
    category: {
      id: (categoryData?.id ?? categoryAttrs?.id ?? "").toString(),
      name: categoryAttrs?.name ?? "",
      slug: categoryAttrs?.slug,
    } as CategoryResType,
    tags: a.tags ?? [],
    collectionType: a.collectionType ?? "popular",
    createdAt: a.createdAt ?? "",
    updatedAt: a.updatedAt ?? "",
    isVeg: Boolean(a.isVeg ?? false),
    documentId: a.documentId ?? entity.documentId ?? "",
  };

  return product;
}

function mapStrapiOrder(entity: any): OrderResType {
  const id = entity.id ?? entity.documentId ?? "";
  const a = entity.attributes ?? entity;
  const productEntity = a.product?.data ?? a.product;

  return {
    id: (a.id ?? id ?? "").toString(),
    orderStatus: a.orderStatus ?? "pending",
    product: mapStrapiProduct(productEntity),
    quantity: Number(a.quantity ?? 1),
    paymentStatus: a.paymentStatus ?? "pending",
    amount: Number(a.amount ?? 0),
    paymentMethod: a.paymentMethod ?? "COD",
    documentId: a.documentId ?? entity.documentId ?? "",
  };
}

function buildFilters({ status, payment, userId }: FiltersInput) {
  const filters: Record<string, any> = {};
  if (userId) {
    filters.user = {
      documentId: {
        $eq: userId,  
      },
    };
  }
  if (status && status !== "all") {
    filters.orderStatus = { $eq: status };
  }
  if (payment && payment !== "all") {
    filters.paymentStatus = { $eq: payment };
  }
  return filters;
}

const populate = {
  product: { populate: ["thumbnail", "category"] },
} as const;

export async function fetchOrders(
  params: FiltersInput = {}
): Promise<OrderResType[]> {
  const query: any = { populate, sort: ["createdAt:desc"] };
  const session = await getServerSession(authOptions);
  const filters = buildFilters({ ...params, userId: session?.user.id  ||""});
  if (Object.keys(filters).length) query.filters = filters;

  const res = await strapi.find("orders", query);
  const items = Array.isArray(res?.data) ? res.data : [];
  return items.map(mapStrapiOrder);
}

export async function fetchOrderByParam(
  idOrDocId: string
): Promise<OrderResType | null> {
  let entity: any | null = null;

  if (isNumericId(idOrDocId)) {
    const res = await strapi.findOne("orders", idOrDocId, { populate });
    entity = res?.data ?? null;
  } else {
    const res = await strapi.find("orders", {
      populate,
      filters: { documentId: { $eq: idOrDocId } },
      pagination: { page: 1, pageSize: 1 },
    });
    entity = Array.isArray(res?.data) && res.data.length ? res.data[0] : null;
  }

  return entity ? mapStrapiOrder(entity) : null;
}
