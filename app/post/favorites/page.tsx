"use client"

import {PostsType} from "@/utils/models";
import {getPosts} from "@/utils/http";
import Post from "@/components/Post";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import {Transition} from '@headlessui/react';

const Favorites = () => {
  const {data, error, isError, isPending, refetch} = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  })

  const posts: PostsType[] = []

  for (let key in data) {
    if (data[key].isFavorite) {
      posts.push({
        id: key,
        summary: data[key].summary,
        text: data[key].text,
        type: data[key].type,
        time: data[key].time,
        isFavorite: data[key].isFavorite
      })
    }
  }

  const postsReverse: PostsType[] = posts.reverse()

  if (data && posts.length === 0 && !error) return (
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
  if (!data && !posts.length && isError) return <Error reset={() => refetch()} error={error}/>

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
        {postsReverse.map(post => {
          return (
            <li key={post.id}>
              <Transition.Child
                enter="ease-linear duration-700 delay-300"
                enterFrom="opacity-0 scale-80"
                enterTo="opacity-100 scale-100"
                className="w-full"
              >
                <Post
                  id={post.id}
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