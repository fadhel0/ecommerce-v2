import prisma from '@/app/libs/Prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  try {
    const { name } = context.params;

    const items = await prisma.products.findMany({
      take: 5,
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    await prisma.$disconnect();
    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse('Something went wrong', { status: 400 });
  }
}
