import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/gemini";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await req.json();

    const response = await prisma.chat.create({
      data: {
        userId: session.user?.id,
        title: title || "New chat",
        createdAt: new Date(),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[NEW_CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 if not provided
    const offset = parseInt(searchParams.get("offset") || "0", 10); // Default to 0 if not provided

    // Fetch paginated chat data
    const response = await prisma.chat.findMany({
      where: {
        userId: session.user?.id,
      },
      take: limit, // Limit the number of records
      skip: offset, // Skip the specified number of records
      orderBy: {
        createdAt: "desc", // Sort by creation date in descending order
      },
    });

    if (!response.length) {
      return new NextResponse("Chats not found", { status: 404 });
    }

    // Check if there are more records to fetch
    const totalChats = await prisma.chat.count({
      where: {
        userId: session.user?.id,
      },
    });

    const nextOffset = offset + limit < totalChats ? offset + limit : null;

    return NextResponse.json({
      results: response,
      nextOffset, // Send the next offset if more data is available
      count: totalChats,
    });
  } catch (error) {
    console.error("CHAT_LIST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Chat ID is required", { status: 400 });
    }

    const response = await prisma.chat.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[DELETE_CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, id } = await req.json();

    const response = await prisma.chat.update({
      data: {
        title: title,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[NEW_CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
