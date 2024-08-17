import Image from "next/image";
import Button from "@/UI/Button";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {sessionUserType} from "@/utils/models";

type ProfileComponentProps = {
  email: string | undefined;
  username: string;
  image: string | undefined;
  style: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = async ({email, username, image, style}) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as sessionUserType

  return (
    <div
      className={style}>
      <Image
        className="bg-white rounded-[50%] h-[256px] w-[256px] border-4 border-solid border-white"
        src={image ? image : "/defaultUserIcon.png"}
        alt="Profile Image"
        height={256}
        width={256}
      />
      <div className="flex justify-center items-start flex-col gap-3 pt-[64px] px-2 w-full">
        <p className="text-3xl">Email:</p>
        <p className="text-2xl text-blue-700 w-full bg-white rounded-lg p-2">{email}</p>
        <p className="text-3xl">User Name:</p>
        <p className="text-2xl w-full bg-white rounded-lg p-2 overflow-x-hidden">{username}</p>
      </div>

      <Button
        action={() => {}}
        text="User Edit"
        style="btn-primary bg-[#528fd9] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
        link={`/profile/${sessionUser.id}/edit`}
      />
    </div>
  )
}

export default ProfileComponent;