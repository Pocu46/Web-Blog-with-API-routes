"use client"

import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import { Transition } from '@headlessui/react';

const PostsHeader: React.FC = () => {
  const pathname: string = usePathname()

  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0 mx-auto my-0">
      <Transition
        appear={true}
        show={true}
        enter="ease-linear duration-700"
        enterFrom="opacity-0 scale-80"
        enterTo="opacity-100 scale-100"
        className="w-full"
      >
        <nav className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Link
            href='/post/list'
            className={pathname === '/post/list'
              ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow transition duration-700 ease-in-out'
              : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white transition duration-700 ease-in-out'
            }
          >
            Posts
          </Link>
          <Link
            href='/post/create'
            className={pathname === '/post/create'
              ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow transition duration-700 ease-in-out'
              : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white transition duration-700 ease-in-out'
            }
          >
            Create
          </Link>
          <Link
            href='/post/favorites'
            className={pathname === '/post/favorites'
              ? 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 bg-white text-blue-700 shadow transition duration-700 ease-in-out'
              : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 text-center focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white transition duration-700 ease-in-out'
            }
          >
            Favorites
          </Link>
        </nav>
      </Transition>
    </div>
  )
}
export default PostsHeader;