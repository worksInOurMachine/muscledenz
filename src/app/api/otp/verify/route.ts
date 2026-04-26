import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { identifier, otp, firstname, lastname } = await request.json();

    if (!identifier || !otp) {
      return NextResponse.json({ error: 'Identifier and OTP are required' }, { status: 400 });
    }

    const otpDoc = await OTP.findOne({ identifier, otp });

    if (!otpDoc) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (otpDoc.expiresAt < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    // OTP is valid
    await OTP.deleteOne({ _id: otpDoc._id });

    // Find or create user
    let user = await User.findOne({ 
      $or: [{ email: identifier }, { phone: identifier }, { identifier: identifier }] 
    });

    if (!user) {
      // Create a new user if not found
      user = await User.create({
        username: identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
        phone: !identifier.includes('@') ? identifier : undefined,
        identifier: identifier,
        firstname: firstname || '',
        lastname: lastname || '',
        confirmed: true
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      jwt: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        identifier: user.identifier,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
