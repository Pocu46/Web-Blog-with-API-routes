import {NextRequest, NextResponse} from "next/server";
import {connectToDB} from "@/utils/database";
import Note from "@/models/note";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)

  if(!session) {
    throw new Error("User not authenticated")
  }

  const {summary, text, type, userId, isFavorite, time} = await request.json()

  try {
    await connectToDB()
    const newNote = new Note({
      creator: userId,
      summary,
      text,
      type,
      isFavorite,
      time
    })

    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 })

  } catch (error) {
    return new NextResponse(String(error), {
      status: 500
    })
  }
}