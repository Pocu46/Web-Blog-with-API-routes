import React from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderProfileComponentProps = {
  image: string | undefined;
  username: string | undefined;
}

const HeaderProfileComponent: React.FC<HeaderProfileComponentProps> = ({image, username}) => {
  return(
    <Link href="/profile" className="flex justify-center items-center gap-2 px-3">
      {image
        ? <img src={image} alt="Profile Image"
               className="bg-white rounded-[50%] h-[36px] w-[36px] border-4 border-solid border-blue-700"/>
        : <Image
          className="bg-white rounded-[50%] h-[36px] w-[36px] border-4 border-solid border-blue-700"
          src="/defaultUserIcon.png"
          alt="Profile Image"
          height={26}
          width={26}
        />}
      {username && <p className="text-xl w-full rounded-lg p-2 overflow-x-hidden">{username}</p>}
    </Link>
  )
}

export default HeaderProfileComponent;