import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/../auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await Order.find({ user: session.user.id })
      .populate('product')
      .populate('address');
    
    const transformedOrders = orders.map((o: any) => {
      const order = o.toObject();
      return {
        ...order,
        id: order._id.toString(),
        documentId: order._id.toString(),
        product: order.product ? {
          ...order.product,
          id: order.product._id.toString(),
          documentId: order.product._id.toString(),
          thumbnail: typeof order.product.thumbnail === 'string' ? { url: order.product.thumbnail } : order.product.thumbnail
        } : null
      };
    });
    return NextResponse.json({ data: transformedOrders });
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
    const order = await Order.create({
      ...body,
      user: session.user.id
    });
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
