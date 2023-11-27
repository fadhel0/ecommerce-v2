import prisma from '@/app/libs/Prisma';
import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Define status codes as constants
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;

async function getUserAddress(cookies: any) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const address = await prisma.addresses.findFirst({
      where: { user_id: user?.id },
    });

    return address;
  } catch (error) {
    throw new Error('Failed to get user address');
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const address = await getUserAddress(cookies);

    return NextResponse.json(address, { status: STATUS_OK });
  } catch (error) {
    console.error(error);

    return new NextResponse('Something went wrong', {
      status: STATUS_BAD_REQUEST,
    });
  }
}
