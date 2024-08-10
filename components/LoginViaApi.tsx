"use client"

import React, {useState} from "react";
import Image from "next/image";
import {signIn} from "next-auth/react";

const ButtonContent = ({image, text}: {image: string; text: string}) => {
  return (
    <>
      <Image
        src={image}
        alt="Google login button"
        width={25}
        height={25}
      />
      {text}
    </>
  )
}

const LoginViaApi = () => {
  const [disabledGoogle, setDisabledGoogle] = useState(false)
  const [disabledGithub, setDisabledGithub] = useState(false)

  const googleHandler = async () => {
    setDisabledGoogle(true)
    await signIn("google", {callbackUrl: "/"})
  }
  const githubHandler = async () => {
    setDisabledGithub(true)
    await signIn("github", {callbackUrl: "/"})
  }

  return (
    <div className="flex justify-center items-center mx-auto flex-col mt-10">
      <div className="flex justify-center items-center gap-2">
        <span className="flex justify-center items-center h-0.5 w-[46px] bg-black"></span>
        or
        <span className="flex justify-center items-center h-0.5 w-[46px] bg-black"></span>
      </div>
      <button
        className="flex justify-center gap-2 items-center rounded-[12px] mt-5 bg-gray-300 w-[176px] h-[46px] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 hover:bg-[#88bddd] hover:text-[white] disabled:bg-gray-300 disabled:text-gray-500"
        type="button"
        onClick={googleHandler}
        disabled={disabledGoogle}
      >
        {!disabledGoogle ? <ButtonContent text="Login via Google" image={"/google.png"} /> : "Loading..."}
      </button>
      <button
        className="flex justify-center gap-2 items-center rounded-[12px] mt-5 bg-gray-300 w-[176px] h-[46px] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 hover:bg-[#88bddd] hover:text-[white] disabled:bg-gray-300 disabled:text-gray-500"
        type="button"
        onClick={githubHandler}
        disabled={disabledGithub}
      >
        {!disabledGithub ? <ButtonContent text="Login via GitHub" image={"/github.png"} /> : "Loading..."}
      </button>
    </div>
  )
}

export default LoginViaApi;