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

    const { message, chatId } = await req.json();

    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const response = await generateResponse(message);

    const requestData = await prisma.message.create({
      data: {
        chatId,
        content: message,
        role: "user",
        createdAt: new Date(),
      },
    });
    const responseData = await prisma.message.create({
      data: {
        chatId,
        content: response,
        role: "assistant",
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      requestData,
      responseData,
    });
  } catch (error) {
    console.error("[CHAT_ERROR]", error);
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
    const chatId = searchParams.get("chatId") || "";

    if (!chatId) {
      return new NextResponse("Chat ID is required", { status: 400 });
    }

    // Fetch paginated chat data
    const response = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      take: limit, // Limit the number of records
      skip: offset, // Skip the specified number of records
      orderBy: {
        createdAt: "asc", // Sort by creation date in descending order
      },
    });

    if (!response.length) {
      return new NextResponse("Messages not found", { status: 404 });
    }

    // Check if there are more records to fetch
    const totalChats = await prisma.message.count({
      where: {
        chatId: chatId,
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
