import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/../auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invoices = await Invoice.find({ user: session.user.id }).populate('subscription');
    const transformedInvoices = invoices.map((i: any) => {
      const invoice = i.toObject();
      return {
        ...invoice,
        id: invoice._id.toString(),
        documentId: invoice._id.toString()
      };
    });
    return NextResponse.json({ data: transformedInvoices });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
