// src/app/api/users/me/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json(null, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { plan: true }
  });
  return Response.json(user);
}