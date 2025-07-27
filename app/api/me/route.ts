import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const dbName = process.env.NEXT_PUBLIC_DB_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
const token = request.headers.get('authorization')?.replace(/^Bearer\s/, '');
  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'Access token required'
    }, { status: 400 });
  }

  let payload: jwt.JwtPayload | string;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('JWT verification error:', err);
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token'
    }, { status: 401 });
  }

  const userId = typeof payload === 'object' && payload !== null && 'id' in payload ? (payload as jwt.JwtPayload).id : undefined;
  if (!userId || typeof userId !== 'string' || !ObjectId.isValid(userId)) {
    return NextResponse.json({
      success: false,
      message: 'Invalid token payload'
    }, { status: 400 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('Users');

    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    const {  ...userInfo } = user;

    return NextResponse.json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.error('API /me error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}