import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

// Get userId from the request, arrange the notes by createdAt in descending order, and select the id of the first note
  const newestNoteId = await prisma.note.findFirst({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({
    newestNoteId: newestNoteId?.id,
  });
}
