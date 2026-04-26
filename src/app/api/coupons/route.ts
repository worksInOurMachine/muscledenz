import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    let query: any = {};
    if (code) query.code = code;

    const coupons = await Coupon.find(query);
    const transformedCoupons = coupons.map((c: any) => {
      const coupon = c.toObject();
      return {
        ...coupon,
        id: coupon._id.toString(),
        documentId: coupon._id.toString()
      };
    });
    return NextResponse.json({ data: transformedCoupons });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
