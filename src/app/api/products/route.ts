import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const collectionType = searchParams.get('collectionType');
    
    let query: any = {};
    if (category) {
      if (category.startsWith('{')) {
        try {
          const catFilter = JSON.parse(category);
          if (catFilter.slug) {
            const cat = await Category.findOne({ slug: catFilter.slug });
            if (cat) query.category = cat._id;
            else query.category = '000000000000000000000000'; // Not found
          }
        } catch (e) {
          query.category = category;
        }
      } else {
        query.category = category;
      }
    }
    if (collectionType) query.collectionType = collectionType;

    // Handle search query / $or filters from frontend (Strapi-like)
    const orFilter = searchParams.get('$or');
    if (orFilter) {
      try {
        const parsedOr = JSON.parse(orFilter);
        query.$or = parsedOr.map((condition: any) => {
          const transformedCondition: any = {};
          Object.entries(condition).forEach(([key, value]: [string, any]) => {
            if (value && typeof value === 'object' && value.$containsi) {
              // Escape regex special characters
              const escapedValue = value.$containsi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              transformedCondition[key] = { $regex: escapedValue, $options: 'i' };
            } else {
              transformedCondition[key] = value;
            }
          });
          return transformedCondition;
        });
      } catch (e) {
        console.error("Error parsing $or filter:", e);
      }
    }

    const products = await Product.find(query).populate('category');
    
    const transformedProducts = products.map((p: any) => {
      const product = p.toObject();
      return {
        ...product,
        id: product._id.toString(),
        documentId: product._id.toString(),
        thumbnail: typeof product.thumbnail === 'string' ? { url: product.thumbnail } : product.thumbnail,
        images: product.images?.map((img: any) => typeof img === 'string' ? { url: img } : img)
      };
    });

    return NextResponse.json({ data: transformedProducts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
