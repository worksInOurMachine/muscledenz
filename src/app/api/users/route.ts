import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get('identifier');
    
    let query: any = {};
    if (identifier) {
      query.$or = [
        { email: identifier },
        { phone: identifier },
        { identifier: identifier }
      ];
    }

    const users = await User.find(query);
    // Mimic Strapi response which is often just an array for /users
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await User.create({
      ...body,
      confirmed: true
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
