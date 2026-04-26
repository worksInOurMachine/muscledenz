import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const collectionType = searchParams.get('collectionType');
    
    let query: any = {};
    if (category) query.category = category;
    if (collectionType) query.collectionType = collectionType;

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
