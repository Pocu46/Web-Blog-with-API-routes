import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/utils/database";
import Note from "@/models/note";
import {validateStringLength} from "@/utils/methods";

export const PATCH = async (request: NextRequest, {params}: {params: {id: string}}) => {
  const session = await getServerSession(authOptions)
  const { summary, text, type } = await request.json()

  if (!session) {
    throw new Error("User not authenticated")
  }

  try {
    await connectToDB();
    // Find the existing prompt by ID
    const existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return new Response("Note not found", {status: 404});
    }

    if(summary && text && type && !validateStringLength(summary, 3) && !validateStringLength(text, 5)) {
      // Update the prompt with new data
      existingNote.summary = summary
      existingNote.text = text
      existingNote.type = type
    }

    await existingNote.save();

    return new Response("Successfully updated the Note", {status: 200});
  } catch (error) {
    return new Response("Error Updating Note", {status: 500});
  }
}

export const DELETE = async (request: NextRequest, {params}: {params: {id: string}}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("User not authenticated")
  }

  console.log("SOME TEXT 1")

  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    const deletedNote = await Note.findOneAndDelete({ _id: params.id })

    if (!deletedNote) {
      console.log('Note not found');
      return null;
    }

    return new Response("Note deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Error deleting Note", { status: 500 })
  }
}

export const PUT = async (request: NextRequest, {params}: {params: {id: string}}) => {
  const session = await getServerSession(authOptions)
  const { summary, text, type, isFavorite } = await request.json()

  if (!session) {
    throw new Error("User not authenticated")
  }

  try {
    await connectToDB();
    // Find the existing prompt by ID
    const existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return new Response("Note not found", {status: 404});
    }

    existingNote.isFavorite = isFavorite

    await existingNote.save();

    return new Response("Successfully updated the Note", {status: 200});
  } catch (error) {
    return new Response("Error Updating Note", {status: 500});
  }
}