import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/utils/database";
import {deleteImage, uploadImage} from "@/utils/methods";
import User from "@/models/user";

export const PATCH = async (request: NextRequest, {params}: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("User not authenticated")
  }

  const data = await request.formData()
  const image = data.get("image") as File
  const imageName = data.get("imageName") as string

  try {
    const imageData = await uploadImage(image)
    await deleteImage(imageName)
    // imageData.imageName  name
    // imageData.imageLink  link

    await connectToDB();
    // Find the existing User by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", {status: 404});
    }

    // Update the User with new data
    if (image && imageData) {
      existingUser.image.imageName = imageData.imageName
      existingUser.image.imageLink = imageData.imageLink
    }

    await existingUser.save();

    return new Response("User successfully updated", {status: 200});
  } catch (error) {
    return new Response("Error User updating", {status: 500});
  }
}