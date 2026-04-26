import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Address from '@/models/Address';
import User from '@/models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/../auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const addresses = await Address.find({ user: session.user.id });
    const transformedAddresses = addresses.map((a: any) => {
      const address = a.toObject();
      return {
        ...address,
        id: address._id.toString(),
        documentId: address._id.toString()
      };
    });
    return NextResponse.json({ data: transformedAddresses });
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
    const address = await Address.create({
      ...body,
      user: session.user.id
    });

    // Update user's addresses array
    await User.findByIdAndUpdate(session.user.id, {
      $push: { addresses: address._id }
    });

    return NextResponse.json({ data: address }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
