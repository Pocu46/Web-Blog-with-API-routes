import React from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderProfileComponentProps = {
  id: string;
  image: string | undefined;
  name: string | undefined;
}

const HeaderProfileComponent: React.FC<HeaderProfileComponentProps> = ({id, image, name}) => {
  return(
    <Link href={`/profile/${id}`} className="flex justify-center items-center gap-2 px-3 max-lg:hidden" data-cy="header-profile-component">
      <Image
        className="bg-white rounded-[50%] h-[36px] w-[36px] border-4 border-solid border-white"
        src={image ? image : "/defaultUserIcon.png"}
        alt="Profile Image"
        height={256}
        width={256}
      />
      {name && <p className="text-xl w-full rounded-lg p-2 overflow-x-hidden">{name}</p>}
    </Link>
  )
}

export default HeaderProfileComponent;