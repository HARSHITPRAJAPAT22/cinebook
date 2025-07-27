import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const dbName: string = process.env.NEXT_PUBLIC_DB_NAME as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!uri || !dbName || !JWT_SECRET) {
  throw new Error('Missing required environment variables');
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('Users');

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }
    if (user.googleId || user.facebookId) {
      if(user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json({
            success: false,
            message: 'Invalid email or password'
          }, { status: 401 });
        }
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return NextResponse.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          },
          token
        });
      }
      return NextResponse.json({
        success: false,
        message: 'User already exists with Google or Facebook account. Please sign in using those methods.'
      }, { status: 409 });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
         console.error('SignIn error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}