"use client"

import Button from "@/UI/Button";
import React, {useState} from "react";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import {postActionProps} from "@/utils/models";
import {postAction, queryClient} from "@/utils/http";
import Modal from "@/components/Modal";
import CreatePost from "@/components/CreatePost";
import Checkbox from "@/UI/Checkbox";
import Marquee from "react-fast-marquee";

type PostProps = {
  id: string,
  summary: string,
  time: string,
  type: string,
  text: string,
  isFavorite: boolean
}
const Post: React.FC<PostProps> = ({id, summary, time, type, text, isFavorite}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isFull, setIsFull] = useState<boolean>(false)
  const {mutate: postActionHandler} = useMutation<void, Error, postActionProps, unknown>({
    mutationKey: ['favoriteStatusChange'],
    mutationFn: postAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
        exact: true
      });
    }
  })

  const favoriteStatusChangeHandler = () => {
    postActionHandler({id, summary, time, type, text, isFavorite, method: "PUT"})
  }

  const deletePostHandler = () => {
    const confirm: boolean = window.confirm("Are you sure you want to delete this article?")

    if (confirm) {
      postActionHandler({id, summary, time, type, text, isFavorite, method: "DELETE"})
    }
  }

  const editOpen = () => {
    setIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const editClose = () => {
    setIsOpened(false)
    document.body.style.overflow = ''
  }

  const changeFullStateHandler = () => {
    setIsFull((prev) => !prev)
  }

  const typeClass: string = type === 'Note'
    ? 'bg-[white] text-[green] w-[63px] h-9 text-center flex justify-center items-center text-[large] mx-[15px] my-0 rounded-[5px] px-1'
    : 'bg-[white] text-[#c6c601] w-[63px] h-9 text-center flex justify-center items-center text-[large] mx-[15px] my-0 rounded-[5px] px-1'

  return (
    <>
      <div className="w-full mx-auto mb-2 border-[3px] rounded-xl border-solid border-[#bccde2]">
        <div className="bg-[#bccde2] py-2 flex justify-around items-center gap-2.5">
          <p className="max-w-[150px] px-2">{time}</p>
          {
            isFull
              ? <Marquee className="w-full h-[25px] text-center"><b>{summary}</b></Marquee>
              : <p className="w-full h-[25px] overflow-hidden text-center"><b>{summary}</b></p>
          }
          <div className="flex justify-between items-center px-2 mx-2">
            <span className={typeClass}>{type}</span>
            <Image
              className="w-[25px] h-[25px]"
              src={isFavorite ? "/star (2).png" : "/star.png"}
              alt="favorite-icon"
              width={25}
              height={25}
            />
          </div>
        </div>

        <p className="flex justify-around items-center text-left h-[150px] overflow-auto pt-2.5 px-1.5 py-0 bg-[white]">{text}</p>

        <div className="bg-[#bccde2] flex justify-center items-center flex-col">
          <div className="flex justify-center items-center py-2 gap-3">
            <Button
              type="button"
              action={editOpen}
              text="Edit"
              style="btn-primary bg-[#528fd9] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
              link="/post/posts"
              isButton={true}
            />
            <Button
              type="button"
              action={deletePostHandler}
              text="Delete"
              style="btn-primary bg-[#de5050] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
              link="/post/posts"
              isButton={true}
            />
            <Button
              type="button"
              action={favoriteStatusChangeHandler}
              text={!isFavorite ? 'Favorite' : 'Unfavourite'}
              style={!isFavorite ? "btn-primary bg-[#dede01] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]" : "btn-primary bg-[gold] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"}
              link="/post/posts"
              isButton={true}
            />
          </div>
          <div>
            <Checkbox action={changeFullStateHandler} text="Enable full Summary text" />
          </div>
        </div>
      </div>

      <Modal
        style="h-full w-full z-[5] bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 z-[5] flex justify-center items-start pt-[128px]"
        open={isOpened}
        onClose={editClose}
        root="modalId"
      >
        <div className="bg-[#b2c2cd] h-[400px] w-[960px] p-[15px] rounded-xl backdrop:bg-[rgba(0,0,0,0.4)]" onClick={(event) => event.stopPropagation()}>
          <CreatePost id={id} summaryValue={summary} textValue={text} typeValue={type} isFavorite={isFavorite} action={editClose} headingText="Edit Post" buttonText="Edit" />
        </div>
      </Modal>
    </>
  )
}

export default Post;