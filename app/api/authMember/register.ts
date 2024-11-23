// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

interface RegisterRequestBody {
  email: string;
  password: string;
  clerkId?: string | null; // clerkId is optional, so it can be undefined or null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, clerkId }: RegisterRequestBody = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if member already exists
    const existingMember = await prisma.member.findUnique({
      where: { email },
    });

    if (existingMember) {
      return res.status(400).json({ error: 'Member already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await prisma.member.create({
      data: {
        email,
        password: hashedPassword,
        clerkId: clerkId ?? null, 
      },
    });

    return res.status(201).json({ message: 'Member created successfully' });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}



