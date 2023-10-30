import prisma from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;

    // 찜 했는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: parseInt(session?.user?.id),
      },
    });

    if (like) {
      // 찜한 상황
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      // 찜하지 않은 상황
      like = await prisma.like.create({
        data: {
          storeId,
          userId: parseInt(session?.user?.id),
        },
      });
      return res.status(201).json(like);
    }
  }
}
