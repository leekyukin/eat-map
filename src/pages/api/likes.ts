import prisma from "@/db";
import { LikeApiResponse, LikeType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeApiResponse | LikeType>,
) {
  const session = await getServerSession(req, res, authOptions);

  const userId = parseInt(session?.user.id);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;

    // 찜 했는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId,
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
          userId,
        },
      });
      return res.status(201).json(like);
    }
  } else {
    const count = await prisma.like.count({
      where: {
        userId,
      },
    });
    const { page = "1", limit = "10" }: ResponseType = req.query;
    const skipPage = parseInt(page) - 1;
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId,
      },
      include: {
        store: true,
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
    });
    return res.status(200).json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
