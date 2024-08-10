"use client"

import React from "react";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Transition} from "@headlessui/react";
import Link from "next/link";

const BurgerMenu: React.FC<{ action: () => void }> = ({action}) => {
  const pathname: string = usePathname()
  const session = useSession()

  console.log(session)

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

      <nav className="m-auto mt-5 flex justify-center items-center flex-col py-2">
        <Link onClick={action} href="/" className={pathname == "/" ? active : style}>Home</Link>
        <Link onClick={action} className={pathname == "/post/create" ? active : style} href="/post/create">Create Post</Link>
        <Link onClick={action} className={pathname == "/post/posts" ? active : style} href="/post/posts">Posts</Link>
        <Link onClick={action} className={pathname == "/post/favorites" ? active : style} href="/post/favorites">Favorites</Link>

        {session?.data?.user && <button onClick={() => signOut()} className={style}>Logout</button>}
      </nav>
    </Transition>
  )
}

export default BurgerMenu;