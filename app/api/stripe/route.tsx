import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error();

    const body = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SK_KEY || '', {
      apiVersion: '2022-11-15',
    });

    const res = await stripe.paymentIntents.create({
      amount: Number(body.amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong', { status: 400 });
  }
}
