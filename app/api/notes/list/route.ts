import {NextRequest} from "next/server";
import {connectToDB} from "@/utils/database";
import Note from "@/models/note";
import {PostsType, sessionUserType} from "@/utils/models";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as sessionUserType

  if(!session) {
    throw new Error("User not authenticated")
  }

  try {
    await connectToDB()

    const notes: PostsType[] | [] = await Note.find({ creator: sessionUser?.id })

    return new Response(JSON.stringify(notes.reverse()), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}