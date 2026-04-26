import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Plan from '@/models/Plan';

export async function GET() {
  try {
    await dbConnect();
    const plans = await Plan.find({});
    const transformedPlans = plans.map((p: any) => {
      const plan = p.toObject();
      return {
        ...plan,
        id: plan._id.toString(),
        documentId: plan._id.toString()
      };
    });
    return NextResponse.json({ data: transformedPlans });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
