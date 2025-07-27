import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri: string = process.env.MONGODB_URI as string;
const dbName: string = process.env.DB_NAME as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('Users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      if(existingUser.googleId || existingUser.facebookId) {
        return NextResponse.json({
          success: false,
          message: 'User already exists with Google or Facebook account. Please sign in using those methods.'
        }, { status: 409 });
      }
      return NextResponse.json({
        success: false,
        message: 'User already exists'
      }, { status: 409 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in DB
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT access token
    const token = jwt.sign(
      { id: result.insertedId, name, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
console.log("user token sign up", token);
    return NextResponse.json({
      success: true,
      user: {
        id: result.insertedId,
        name,
        email
      },
      token
    });
  } catch (error) {
    console.error('SignUp error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}