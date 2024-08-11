"use client"

import {getFavoritePosts} from "@/utils/http";
import Post from "@/components/Post";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/ErrorComponent";
import {Transition} from '@headlessui/react';

const Favorites = () => {
  const {data, error, isError, isPending, refetch} = useQuery({
    queryKey: ['posts'],
    queryFn: getFavoritePosts,
    refetchOnWindowFocus: false,
  })

  if (data && data.length === 0 && !error) return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full min-h-[calc(100vh_-_64px_-_64px)] flex justify-center items-center"
    >
      <p className="text-center text-4xl text-[#14077c]">No data is added to Favorites!</p>
    </Transition>
  )
  if (isPending) return <Loader/>
  if (!data && isError) return <Error reset={() => refetch()} error={error}/>

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full min-h-[calc(100vh_-_64px_-_64px)]"
    >
      <ul className="h-auto">
        {data.map(post => {
          return (
            <li key={post._id}>
              <Transition.Child
                enter="ease-linear duration-700 delay-300"
                enterFrom="opacity-0 scale-80"
                enterTo="opacity-100 scale-100"
                className="w-full"
              >
                <Post
                  id={post._id}
                  time={post.time}
                  summary={post.summary}
                  text={post.text}
                  type={post.type}
                  isFavorite={post.isFavorite}
                />
              </Transition.Child>
            </li>
          )
        })}
      </ul>
    </Transition>
  )
}

export default Favorites;