import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Helper function to check if a show date/time is in the past
// function isPast(showDate: string, showTime: string): boolean {
//   const showDateTime = new Date(`${showDate}T${showTime}:00`);
//   return showDateTime < new Date();
// }
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const dbName: string = process.env.NEXT_PUBLIC_DB_NAME as string;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theaterId = searchParams.get('theatorId');

  if (!theaterId) {
    return NextResponse.json({ error: 'theatorId is required' }, { status: 400 });
  }

  // Use secure environment variables for MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const theatersCollection = db.collection('Theaters');

    let theater = await theatersCollection.findOne({ id: theaterId });

    // If theater not found, create a new entry
    if (!theater) {
      const newTheater = {
        id: theaterId,
        showDate: [],
        bookedSeats: {}
      };
      await theatersCollection.insertOne(newTheater);
      return NextResponse.json({ message: 'Theater created', theater: newTheater }, { status: 201 });
    }

    // Remove past bookings from the database
    // let bookingsToKeep = Array.isArray(theater.bookings)
    //   ? theater.bookings.filter((booking: any) => !isPast(booking.showDate, booking.showTime))
    //   : [];

    // if (bookingsToKeep.length < (theater.bookings?.length || 0)) {
    //   await theatersCollection.updateOne(
    //     { id: theaterId },
    //     { $set: { bookings: bookingsToKeep } }
    //   );
    //   theater.bookings = bookingsToKeep;
    // }

    // Format showDate and bookedSeats for response
    // const formattedShowDates: { date: string, time: string[] }[] = [];
    // const bookedSeats: Record<string, Record<string, string[]>> = {};

    // if (Array.isArray(theater.bookings)) {
    //   theater.bookings.forEach((booking: any) => {
    //     if (booking.showDate && booking.showTime && booking.seats) {
    //       let showDateObj = formattedShowDates.find(sd => sd.date === booking.showDate);
    //       if (showDateObj) {
    //         if (!showDateObj.time.includes(booking.showTime)) {
    //           showDateObj.time.push(booking.showTime);
    //         }
    //       } else {
    //         formattedShowDates.push({
    //           date: booking.showDate,
    //           time: [booking.showTime]
    //         });
    //       }
    //       if (!bookedSeats[booking.showDate]) bookedSeats[booking.showDate] = {};
    //       if (!bookedSeats[booking.showDate][booking.showTime]) bookedSeats[booking.showDate][booking.showTime] = [];
    //       bookedSeats[booking.showDate][booking.showTime].push(...booking.seats);
    //     }
    //   });
    // }

    return NextResponse.json({
      theater: {
        ...theater,
        // showDate: formattedShowDates,
        // bookedSeats
      }
    });
  } catch (error: any) {
    console.error('Database error in GET /api/theators/[theatorId]:', error);
    return NextResponse.json({ error: 'Database error', details: error?.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
