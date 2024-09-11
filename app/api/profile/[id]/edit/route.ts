import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/utils/database";
import {uploadImage, validateEmail, validatePassword, validateStringLength} from "@/utils/methods";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const PATCH = async (request: NextRequest, {params}: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("User not authenticated")
  }

  const data = await request.formData()
  const email = data.get("email") as string
  const name = data.get("name") as string
  const password = data.get("password") as string
  const image = data.get("image") as File
  const imageName = data.get("imageName") as string

  try {
    const imageData = await uploadImage(image)
    // imageData.imageName  name
    // imageData.imageLink  link

    await connectToDB();
    // Find the existing User by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", {status: 404});
    }

    // Update the User with new data
    if (email && validateEmail(email)) existingUser.email = email
    if (name && validateStringLength(name, 3)) existingUser.name = name
    if (password && validatePassword(password)) {
      const hashedPassword = await bcrypt.hash(password, 8)
      existingUser.password = hashedPassword
    }
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