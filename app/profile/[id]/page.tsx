import ProfileComponent from "@/components/ProfileComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {sessionUserType} from "@/utils/models";

const Page = async () => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as sessionUserType

  return(
    <ProfileComponent
      email={sessionUser.email}
      username={sessionUser.username}
      image={sessionUser.image}
      style="flex flex-col justify-start items-center py-[64px] min-h-[calc(100vh_-_64px)] w-full bg-gradient-to-b"
    />
  )
}

export default Page;