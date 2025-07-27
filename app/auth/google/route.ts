import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri: string = process.env.MONGODB_URI as string;
const dbName: string = process.env.DB_NAME as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  const { name, email, googleId, facebookId, authProvider } = await request.json();

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('Users');

    // 1. Check if user exists by googleId
    if (googleId) {
      const existingGoogleUser = await users.findOne({ googleId });
      if (existingGoogleUser) {
        // User exists, just return token
        const token = jwt.sign(
          { id: existingGoogleUser._id.toString(), name: existingGoogleUser.name, email: existingGoogleUser.email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return NextResponse.json({
          success: true,
          user: {
            id: existingGoogleUser._id,
            name: existingGoogleUser.name,
            email: existingGoogleUser.email,
            googleId: existingGoogleUser.googleId,
            facebookId: existingGoogleUser.facebookId || null,
            authProvider: existingGoogleUser.authProvider || 'google'
          },
          token
        });
      }
    }

    // 2. If googleId not present, check if user exists by email
    const existingEmailUser = await users.findOne({ email });
    if (existingEmailUser) {
      // Update user to add googleId and authProvider
      await users.updateOne(
        { email },
        { $set: { googleId: googleId || null, authProvider: 'google' } }
      );
      const updatedUser = await users.findOne({ email });
      if (!updatedUser) {
        return NextResponse.json({
          success: false,
          message: 'User not found after update.'
        }, { status: 404 });
      }
      const token = jwt.sign(
        { id: updatedUser._id.toString(), name: updatedUser.name, email: updatedUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return NextResponse.json({
        success: true,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          googleId: updatedUser.googleId,
          facebookId: updatedUser.facebookId || null,
          authProvider: updatedUser.authProvider || 'google'
        },
        token
      });
    }

    // 3. If not, create new user and return token
    const result = await users.insertOne({
      name,
      email,
      password: '',
      googleId: googleId || null,
      facebookId: facebookId || null,
      authProvider: authProvider || 'google'
    });

    const token = jwt.sign(
      { id: result.insertedId.toString(), name, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: result.insertedId,
        name,
        email,
        googleId: googleId || null,
        facebookId: facebookId || null,
        authProvider: authProvider || 'google'
      },
      token
    });
  } catch (error) {
    console.error('Google Auth error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}