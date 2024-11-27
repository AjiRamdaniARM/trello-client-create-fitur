import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  try {
    const member = await prisma.member.findUnique({ where: { email } });

    if (!member) {
      return NextResponse.json({ message: 'Email Anda Salah' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Password Anda Salah' }, { status: 401 });
    }

    const token = sign({ memberId: member.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const serialized = serialize('memberToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    });

    return NextResponse.json(
      { message: 'Login successful' },
      {
        status: 200,
        headers: { 'Set-Cookie': serialized },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
