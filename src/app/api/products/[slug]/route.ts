import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    
    const query = mongoose.isValidObjectId(slug) ? { _id: slug } : { ecomUrl: slug };
    const product = await Product.findOne(query).populate('category');
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const transformedProduct = {
      ...product.toObject(),
      id: product._id.toString(),
      documentId: product._id.toString(),
      thumbnail: typeof product.thumbnail === 'string' ? { url: product.thumbnail } : product.thumbnail,
      images: product.images?.map((img: any) => typeof img === 'string' ? { url: img } : img)
    };

    return NextResponse.json({ data: transformedProduct });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
