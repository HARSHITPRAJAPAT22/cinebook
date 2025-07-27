import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME as string;

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId || !ObjectId.isValid(userId)) {
    return NextResponse.json({
      success: false,
      message: 'Invalid or missing userId'
    }, { status: 400 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('Users');

    const user = await users.findOne({ _id: new ObjectId(userId) }, { projection: { bookings: 1 } });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      bookings: user.bookings || []
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}