import { NextResponse } from 'next/server';

export async function GET(request: Request, context : any) {
  const paymentId : string =  context.params.paymentId;
  const key_id : string = process.env.NEXT_PUBLIC_RAZORPAY_KEY as string;
  const key_secret : string = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string;
    if (!key_id || !key_secret) {
        return NextResponse.json({ error: 'Razorpay credentials not set' }, { status: 500 });
    }

  const auth = Buffer.from(`${key_id}:${key_secret}`).toString('base64');
  const url = `https://api.razorpay.com/v1/payments/${paymentId}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('DEBUG: Error fetching payment info:', error);
    return NextResponse.json({ error: 'Failed to fetch payment info' }, { status: 500 });
  }
}