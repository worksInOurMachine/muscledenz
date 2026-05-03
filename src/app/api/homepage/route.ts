import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomePage from '@/models/HomePage';

export async function GET() {
  try {
    await dbConnect();
    let homePage = await HomePage.findOne({});
    if (!homePage) {
      // Create a default one if it doesn't exist
      homePage = await HomePage.create({
        top_banners: [],
        about_images: [],
        reviews: [],
        headlineText: "Welcome to MuscleDenz"
      });
    }
    const transformedHomePage = {
      ...homePage.toObject(),
      id: homePage._id.toString(),
      documentId: homePage._id.toString(),
      top_banners: homePage.top_banners?.map((img: string) => ({ url: img })),
      about_images: homePage.about_images?.map((img: any) => {
        if (typeof img === 'string') return { url: img };
        return {
          url: img.url,
          title: img.title,
          description: img.description,
          _id: img._id?.toString()
        };
      })
    };

    return NextResponse.json({ data: transformedHomePage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    let homePage = await HomePage.findOneAndUpdate({}, body, { new: true, upsert: true });
    const transformedHomePage = {
      ...homePage.toObject(),
      id: homePage._id.toString(),
      documentId: homePage._id.toString(),
      top_banners: homePage.top_banners?.map((img: string) => ({ url: img })),
      about_images: homePage.about_images?.map((img: any) => {
        if (typeof img === 'string') return { url: img };
        return {
          url: img.url,
          title: img.title,
          description: img.description,
          _id: img._id?.toString()
        };
      })
    };
    return NextResponse.json({ data: transformedHomePage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
