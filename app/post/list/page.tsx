"use client"

import Post from "@/components/Post";
import {getPosts} from "@/utils/http";
import {PostsType} from "@/utils/models";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/ErrorComponent";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Transition} from '@headlessui/react';

const Posts = () => {
  const [filter, setFilter] = useState<string>('All')
  const [filteredArray, setFilteredArray] = useState<PostsType[]>([])
  const [search, setSearch] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>(null)
  const {data, error, isError, isPending, refetch} = useQuery({
    queryKey: ['list'],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  })

  const filterHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setFilter(event.target.value)
  }

  const searchTextChangeHandler = () => {
    setSearch((searchRef.current!.value).trim())
  }

  const searchTextChangeHandlerKeyboard: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setSearch((searchRef.current!.value).trim())
    }
  }

  const searchTextDeleteHandler = (): void => {
    setSearch('')
    searchRef.current!.value = ''
  }

  useEffect(() => {
    let temporaryFilteredArray: PostsType[] = []

    if (filter === 'All') {
      if (data && data.length > 0) temporaryFilteredArray = [...data]
    }
    if (filter === 'Notes') {
      if (data && data.length > 0) {
        temporaryFilteredArray = (data.filter(post => {
          if (post.type === 'Note') {
            return true
          }
        }))
      }
    }
    if (filter === 'News') {
      if (data && data.length > 0) {
        temporaryFilteredArray = (data.filter(post => {
          if (post.type === 'News') {
            return true
          }
        }))
      }
    }
    if (search.length) {
      temporaryFilteredArray = temporaryFilteredArray.filter(post => (post.summary)?.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredArray(temporaryFilteredArray)
  }, [filter, data, search])

  if (data && data.length === 0 && !error) return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full h-[calc(100vh_-_64px_-_64px)] flex justify-center items-center"
    >
      <p className="text-center text-4xl text-[#14077c] w-full">No data is added to Posts!</p>
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
      <ul>
        <div className="w-full flex justify-between gap-[15px]">
          <select onChange={filterHandler}
                  className="w-[120px] my-2 cursor-default rounded-lg bg-white py-1 pl-1 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
          >
            <option>All</option>
            <option>Notes</option>
            <option>News</option>
          </select>

          <div
            className="bg-[#1e3a8a33] w-full flex justify-around items-center my-2 cursor-default rounded-lg py-1 pl-1 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
          >
            <input
              className="w-full h-[36px] px-1 rounded-lg"
              type="text"
              placeholder="Search Post"
              defaultValue={search}
              ref={searchRef}
              onKeyDown={searchTextChangeHandlerKeyboard}
            />

            <div className="w-[46px] flex justify-center">
              <Image
                src={search.length ? "/closeButton.svg" : "/searchIcon.svg"}
                alt="close button"
                className="w-[25px] h-[25px]"
                onClick={search.length ? searchTextDeleteHandler : searchTextChangeHandler}
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>

        {
          ((data && search && filteredArray.length === 0) || (data && filteredArray.length === 0))
            ? <Transition.Child
              enter="ease-linear duration-700 delay-300"
              enterFrom="opacity-0 scale-80"
              enterTo="opacity-100 scale-100"
              className="w-full h-[calc(100vh_-_64px_-_64px)]"
            >
              <p className="text-center text-4xl text-[#14077c] w-full h-full">No articles are found</p>
            </Transition.Child>
            : filteredArray.map(post => {
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
            })
        }
      </ul>
    </Transition>
  )
}

export default Posts;