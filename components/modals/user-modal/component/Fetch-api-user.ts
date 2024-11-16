import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; // Prisma client Anda
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler( req: NextApiRequest,
  res: NextApiResponse) {
  const { userId } = auth(); // Mendapatkan ID user dari Clerk

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      // Ambil data user berdasarkan Clerk ID
      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
