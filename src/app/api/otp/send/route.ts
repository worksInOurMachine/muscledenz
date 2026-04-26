import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { identifier } = await request.json();
    
    if (!identifier) {
      return NextResponse.json({ error: 'Identifier is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save OTP to database (upsert)
    await OTP.findOneAndUpdate(
      { identifier },
      { otp, expiresAt, isVerified: false },
      { upsert: true, new: true }
    );

    // In a real app, you would send the OTP via SMS or Email here.
    // For now, we'll just log it and return a success message.
    console.log(`OTP for ${identifier}: ${otp}`);

    return NextResponse.json({ message: 'OTP sent successfully', success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
