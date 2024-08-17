import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/utils/database";
import {validateEmail, validatePassword, validateStringLength} from "@/utils/methods";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const PATCH = async (request: NextRequest, {params}: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const {email, userName, password, image} = await request.json()

  if (!session) {
    throw new Error("User not authenticated")
  }

  try {
    await connectToDB();
    // Find the existing User by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", {status: 404});
    }

    // Update the User with new data
    if (email && validateEmail(email)) existingUser.email = email
    if (userName && validateStringLength(userName, 3)) existingUser.userName = userName
    if (password && validatePassword(password)) {
      const hashedPassword = await bcrypt.hash(password, 8)

      existingUser.password = hashedPassword
    }
    // if (image) existingUser.image = image


    await existingUser.save();

    return new Response("User successfully updated", {status: 200});
  } catch (error) {
    return new Response("Error User updating", {status: 500});
  }
}