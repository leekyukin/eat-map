import { authOptions } from "@/app/api/auth/[...next-auth]/route";
import prisma from "@/db";
import { CommentApiResponse, CommentType } from "@/interface";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentApiResponse | CommentType>,
) {
  const session = await getServerSession(req, res, authOptions);
  const { page = "1", limit = "10", storeId = "" } = req.body;

  if (req.method === "POST") {
    if (!session?.user) {
      return res.status(401);
    }
    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: session.user.id,
      },
    });
    return res.status(200).json(comment);
  } else if (req.method === "DELETE") {
  } else if (req.method === "GET") {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment.count({
      where: { storeId: storeId },
    });
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
