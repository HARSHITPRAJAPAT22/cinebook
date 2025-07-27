import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from "mongodb";
import {  Theater, User } from "@/lib/models/model";

const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const dbName: string = process.env.NEXT_PUBLIC_DB_NAME as string;

export async function POST(request: Request) {
  const { userId, booking } = await request.json();

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection<User>('Users');
    const theaters = db.collection<Theater>('Theaters');

    // 1. Save booking in user's bookings
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { bookings: booking } }
    );

    // 2. Update theater showDate and booked seats
    await theaters.updateOne(
      { id: booking.theaterId },
      {
        $addToSet: {
          // Add showDate if not present
          showDate: {
            date: booking.showDate,
            time: [booking.showTime]
          },
          // Add booked seats for this show
          [`bookedSeats.${booking.showDate}.${booking.showTime}`]: { $each: booking.seats }
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save booking error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

