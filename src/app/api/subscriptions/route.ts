import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscription from '@/models/Subscription';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/../auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscriptions = await Subscription.find({ user: session.user.id }).populate('plan');
    const transformedSubscriptions = subscriptions.map((s: any) => {
      const sub = s.toObject();
      return {
        ...sub,
        id: sub._id.toString(),
        documentId: sub._id.toString()
      };
    });
    return NextResponse.json({ data: transformedSubscriptions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const subscription = await Subscription.create({
      ...body,
      user: session.user.id
    });
    return NextResponse.json({ data: subscription }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
