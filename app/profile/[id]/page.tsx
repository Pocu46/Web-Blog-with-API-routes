import ProfileComponent from "@/components/ProfileComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {sessionUserType} from "@/utils/models";

const Profile = async () => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as sessionUserType

  return(
    <ProfileComponent
      email={sessionUser.email}
      name={sessionUser.name}
      image={sessionUser?.image?.imageLink}
      style="flex flex-col justify-start items-center py-[64px] min-h-[calc(100vh_-_64px)] w-full bg-gradient-to-b"
    />
  )
}

export default Profile;