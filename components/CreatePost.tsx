"use client"

import React, {useEffect, useRef, useState} from "react";
import Button from "@/UI/Button";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {editPost, queryClient, sendPost} from "@/utils/http";
import Loader from "@/components/Loader";
import {editPostProps, SendPostProps, sessionUserType} from "@/utils/models";
import {Transition} from '@headlessui/react';
import {useSession} from "next-auth/react";
import ErrorComponent from "@/components/ErrorComponent";
import {validateStringLength} from "@/utils/methods";

type CreatePostProps = {
  id?: string;
  summaryValue?: string;
  textValue?: string;
  typeValue?: string;
  isFavorite?: boolean;
  action?: () => void;
  headingText: string;
  buttonText: string;
}

const CreatePost: React.FC<CreatePostProps> = ({
                                                 id,
                                                 summaryValue,
                                                 textValue,
                                                 typeValue,
                                                 isFavorite,
                                                 action,
                                                 headingText,
                                                 buttonText
                                               }) => {
  const [summaryVal, setSummaryVal] = useState<string | undefined>('')
  const [textVal, setTextVal] = useState<string | undefined>('')
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [summaryError, setSummaryError] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const summaryRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const session = useSession()
  const router = useRouter()
  const sessionUser = session?.data?.user as sessionUserType

  useEffect(() => {
    if (summaryValue && textValue && typeValue && summaryRef.current !== null && textRef.current !== null && typeRef.current !== null) {
      setSummaryVal(summaryValue)
      setTextVal(textValue)
      typeRef.current.value = typeValue
    }
  }, [])

  useEffect(() => {
    if (summaryVal!.trim().length >= 3) {
      setSummaryError(false);
    }
    if (textVal!.trim().length >= 5) {
      setTextError(false);
    }
  }, [summaryVal, textVal])

  const {mutate, isError, error} = useMutation<void, Error, SendPostProps, unknown>({
    mutationKey: ['createPost'],
    mutationFn: sendPost,
    onSuccess: () => {
      setIsSpinning(true)
      queryClient.invalidateQueries({
        queryKey: ['list'],
        exact: true
      });
      router.replace('/post/list')
    }
  })
  const {
    mutate: editPostMethod,
    isError: isEditError,
    error: editError
  } = useMutation<void, Error, editPostProps, unknown>({
    mutationKey: ['editPost'],
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
        exact: true
      })
    }
  })

  const createPostHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true

    if(validateStringLength(summaryVal, 3) || !summaryVal) {
      setSummaryError(true);
      isValid = false
    }
    if(validateStringLength(textVal, 5) || !textVal) {
      setTextError(true);
      isValid = false
    }

    if(isValid) {
      mutate({
        userId: sessionUser?.id,
        summary: summaryVal,
        text: textVal,
        type: typeRef.current?.value
      })
    }
  }

  const summaryStyles: string = summaryError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"
  const textStyles: string = textError ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"

  const summaryChangeHandler = () => {
    setSummaryVal(summaryRef.current?.value)
  }

  const textChangeHandler = () => {
    setTextVal(textRef.current?.value)
  }

  const editPostHandler = () => {
    editPostMethod({
      id,
      summary: summaryRef.current?.value,
      type: typeRef.current?.value,
      text: textRef.current?.value,
      isFavorite
    })

    action && action()
  }

  if (isSpinning && !isError) return <Loader/>
  if (isError) {
    return (
      <ErrorComponent reset={() => mutate({
        userId: sessionUser?.id,
        summary: summaryVal,
        text: textVal,
        type: typeRef.current?.value
      })}
             error={error}
      />
    )
  }
  if (isEditError) return <ErrorComponent reset={editPostHandler} error={editError}/>

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full"
    >
      <form className="w-full h-auto" onSubmit={buttonText === "Edit" ? editPostHandler : createPostHandler}>
        <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">{headingText}</h2>

        <div className="my-2 flex flex-col">
          <label htmlFor="summary" className="mb-2">Summary *</label>
          <input
            id="summary"
            type="text"
            ref={summaryRef}
            value={summaryVal}
            onChange={summaryChangeHandler}
            className={summaryStyles}
            placeholder="Enter your summary"
          />
          {summaryError && <p className="text-[red]">The Summary field should have at least 3 characters</p>}
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="text" className="mb-2">Text *</label>
          <textarea
            id="text"
            ref={textRef}
            value={textVal}
            onChange={textChangeHandler}
            className={textStyles}
            placeholder="Enter your article text"
          />
          {textError && <p className="text-[red]">The Text field should have at least 5 characters</p>}
        </div>

        <div className="w-full my-2 flex flex-row rounded-md border-2 border-solid border-[#99aec3]">
          <select
            name="type"
            ref={typeRef}
            className="w-full px-3 py-1.5"
          >
            <option value="Note">Note</option>
            <option value="News">News</option>
          </select>
          <label className="w-[100px] px-3 py-1.5 border-l-2 border-solid border-[#99aec3]">Options</label>
        </div>

        <Button
          text={buttonText}
          style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
          link="/post/list"
          type="submit"
          isButton={true}
        />
      </form>
    </Transition>
  );
};

export default CreatePost;
