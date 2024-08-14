"use client"

import React from "react";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Transition} from "@headlessui/react";
import Link from "next/link";
import {sessionUserType} from "@/utils/models";
import Image from "next/image";

const BurgerMenu: React.FC<{ action: () => void }> = ({action}) => {
  const pathname: string = usePathname()
  const session = useSession()
  const sessionUser = session?.data?.user as sessionUserType

  const active: string = "bg-[#88bddd] w-full h-[4rem] flex justify-center items-center text-[black] text-3xl font-[200] leading-[1] text-[white] hover:bg-[#000] hover:text-[white] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300"
  const style: string = "w-full h-[4rem] flex justify-center items-center text-3xl font-[200] leading-[1] text-[white] hover:bg-[#000] hover:text-[white] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300"

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
    >
      <h2 className="py-3 bg-[#4a535c] text-[white] m-auto mt-3 text-center text-2xl font-[200] leading-[1]">Create your
        posts to
        save them!</h2>

      {sessionUser && <div className="flex flex-col justify-center items-center w-full p-3">
        {sessionUser?.image
          ? <img src={sessionUser?.image} alt="Profile Image"
                 className="bg-white rounded-[50%] h-[126px] w-[126px] border-4 border-solid border-white"/>
          : <Image
            className="bg-white rounded-[50%] h-[126px] w-[126px] border-4 border-solid border-white"
            src="/defaultUserIcon.png"
            alt="Profile Image"
            height={126}
            width={126}
          />}
          <p className="text-2xl w-full bg-white rounded-lg p-2 my-3 text-center text-blue-700 overflow-x-hidden">
            <b>
              {sessionUser?.username}
            </b>
          </p>
      </div>}

      <nav className="m-auto mt-5 flex justify-center items-center flex-col py-2">
        {/*<Link onClick={action} className={pathname == "/post/profile" ? active : style} href="/profile">Profile</Link>*/}
        <Link onClick={action} className={pathname == "/post/profile" ? active : style} href={`/profile/${sessionUser.id}`}>Profile</Link>
        <Link onClick={action} href="/" className={pathname == "/" ? active : style}>Home</Link>
        <Link onClick={action} className={pathname == "/post/create" ? active : style} href="/post/create">Create Post</Link>
        <Link onClick={action} className={pathname == "/post/posts" ? active : style} href="/post/posts">Posts</Link>
        <Link onClick={action} className={pathname == "/post/favorites" ? active : style} href="/post/favorites">Favorites</Link>

        {sessionUser && <div className="h-[146px] w-full flex justify-center items-center">
            <button onClick={() => signOut()} className={style}>Logout</button>
        </div>}
      </nav>
    </Transition>
  )
}

export default BurgerMenu;