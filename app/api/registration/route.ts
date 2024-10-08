import {NextRequest, NextResponse} from "next/server";
import User from "@/models/user";
import {connectToDB} from "@/utils/database";
import bcrypt from "bcrypt";
import {validateEmail, validatePassword, validateStringLength} from "@/utils/methods";

export const POST = async (request: NextRequest) => {
  const {email, name, password, confirmPassword} = await request.json()

  await connectToDB()

  // check if user already exists
  const userExists = await User.findOne({ email });

  if(userExists) {
    throw new Error("User is already exists")
  }

  const passwordMatched = validatePassword(password)

  // if not, create a new document and save user in MongoDB
  if (!userExists && validateEmail(email) && !validateStringLength(name, 3) && (password === confirmPassword) && passwordMatched) {
    const hashedPassword = await bcrypt.hash(password, 8)

    try {
      await User.create({
        email,
        name,
        password: hashedPassword
      });
    } catch (error) {
      return new NextResponse(String(error), {
        status: 500
      })
    }

    return new NextResponse("User has been created", {
      status: 201
    })
  }
}