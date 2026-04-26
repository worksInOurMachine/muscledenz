import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({});
    const transformedCategories = categories.map((c: any) => {
      const category = c.toObject();
      return {
        ...category,
        id: category._id.toString(),
        documentId: category._id.toString(),
        slug: category.slug || category.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
        thumbnail: typeof category.thumbnail === 'string' ? { url: category.thumbnail } : category.thumbnail
      };
    });
    return NextResponse.json({ data: transformedCategories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const category = await Category.create(body);
    return NextResponse.json({ data: category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
