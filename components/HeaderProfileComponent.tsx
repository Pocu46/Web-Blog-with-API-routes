import React from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderProfileComponentProps = {
  id: string;
  image: string | undefined;
  username: string | undefined;
}

const HeaderProfileComponent: React.FC<HeaderProfileComponentProps> = ({id, image, username}) => {
  return(
    <Link href={`/profile/${id}`} className="flex justify-center items-center gap-2 px-3">
      <Image
        className="bg-white rounded-[50%] h-[36px] w-[36px] border-4 border-solid border-white"
        src={image ? image : "/defaultUserIcon.png"}
        alt="Profile Image"
        height={256}
        width={256}
      />
      {username && <p className="text-xl w-full rounded-lg p-2 overflow-x-hidden">{username}</p>}
    </Link>
  )
}

export default HeaderProfileComponent;