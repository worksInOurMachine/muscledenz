import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    
    const [trending, popular, justLaunched, ayurveda] = await Promise.all([
      Product.find({ collectionType: 'trending' }).populate('category'),
      Product.find({ collectionType: 'popular' }).populate('category'),
      Product.find({ collectionType: 'just-launched' }).populate('category'),
      Product.find({ collectionType: 'life-style' }).populate('category'), // Mapping ayurveda to life-style or whatever matches
    ]);

    const transform = (products: any[]) => products.map((p: any) => {
      const product = p.toObject();
      return {
        ...product,
        id: product._id.toString(),
        documentId: product._id.toString(),
        thumbnail: typeof product.thumbnail === 'string' ? { url: product.thumbnail } : product.thumbnail,
        images: product.images?.map((img: any) => typeof img === 'string' ? { url: img } : img)
      };
    });

    return NextResponse.json({
      data: {
        trending: transform(trending),
        popular: transform(popular),
        justLaunched: transform(justLaunched),
        ayurveda: transform(ayurveda),
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
