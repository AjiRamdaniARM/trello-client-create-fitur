import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Ambil data dari body request
    const { email, password, name } = await req.json();

    // Validasi input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat member baru di database menggunakan Prisma
    const newMember = await prisma.member.create({
      data: {
        email,
        password: hashedPassword, // Simpan password yang telah di-hash
        name,
      },
    });

    // Kirim respons sukses
    return NextResponse.json(
      {
        message: 'Member registered successfully',
        newMember,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error registering member:', error);

    // Tangani error unik (contoh: email sudah ada)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Tangani error lainnya
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    // Pastikan Prisma Client ditutup
    await prisma.$disconnect();
  }
}
