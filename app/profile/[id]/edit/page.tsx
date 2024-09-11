import EditProfileComponent from "@/components/EditProfileComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {sessionUserType} from "@/utils/models";

const UserEdit = async () => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as sessionUserType

  return(
    <EditProfileComponent
      id={sessionUser.id}
      email={sessionUser.email}
      name={sessionUser.name}
      image={sessionUser.image?.imageLink}
      imageName={sessionUser.image?.imageName ? sessionUser.image?.imageName : ""}
    />
  )
}

export default UserEdit;