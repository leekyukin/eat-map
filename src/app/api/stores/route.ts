import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import NextAuth from "next-auth/next";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const q = searchParams.get("q") as string;
  const district = searchParams.get("district") as string;
  const id = searchParams.get("id") as string;

  const session = await getServerSession(authOptions);

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit),
      skip: skipPage * 10,
    });

    return NextResponse.json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        likes: {
          where: session ? { userId: parseInt(session.user.id) } : {},
        },
      },
    });

    return NextResponse.json(id ? stores[0] : stores, {
      status: 200,
    });
  }
};

export const POST = async (req: Request) => {
  const formData = await req.json();
  const result = await prisma.store.create({
    data: { ...formData },
  });

  return NextResponse.json(result, { status: 200 });
};

export const PUT = async (req: Request) => {
  const formData = await req.json();
  const result = await prisma.store.update({
    where: { id: formData.id },
    data: { ...formData },
  });

  return NextResponse.json(formData, { status: 200 });
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await prisma.store.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(result, { status: 200 });
  }
  return NextResponse.json(null, { status: 500 });
};
