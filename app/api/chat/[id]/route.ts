import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session: any = await getServerSession(authOptions);
    const { id } = params;
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch paginated chat data
    const response: any = await prisma.chat.findUnique({
      where: {
        id: id,
      },
    });

    if (!response) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json({
      result: response,
    });
  } catch (error) {
    console.error("CHAT_LIST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
