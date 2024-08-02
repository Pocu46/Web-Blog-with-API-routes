"use client"

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import Image from "next/image";

const LoginViaApi = () => {
  const [disabledGoogle, setDisabledGoogle] = useState(false)
  const [disabledGithub, setDisabledGithub] = useState(false)

  const googleHandler = () => {
    setDisabledGoogle(true)
    signIn("google", {callbackUrl: "/"})
  }
  const githubHandler = () => {
    setDisabledGithub(true)
    signIn("github", {callbackUrl: "/"})
  }

  return (
    <div className="flex justify-center items-center mx-auto flex-col mt-10">
      <div className="flex justify-center items-center gap-2">
        <span className="flex justify-center items-center h-0.5 w-[46px] bg-black"></span>
        or
        <span className="flex justify-center items-center h-0.5 w-[46px] bg-black"></span>
      </div>
      <button
        className="flex justify-center gap-2 items-center rounded-[12px] mt-5 bg-gray-300 w-[176px] h-[46px] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 hover:bg-[#88bddd] hover:text-[white]"
        type="button"
        onClick={googleHandler}
        disabled={disabledGoogle}
      >
        <Image
          src={"/google.png"}
          alt="Google login button"
          width={25}
          height={25}
        />
        {!disabledGoogle ? "Login via Google" : "Loading..."}
      </button>
      <button
        className="flex justify-center gap-2 items-center rounded-[12px] mt-5 bg-gray-300 w-[176px] h-[46px] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 hover:bg-[#88bddd] hover:text-[white]"
        type="button"
        onClick={githubHandler}
        disabled={disabledGithub}
      >
        <Image
          src={"/github.png"}
          alt="GitHub login button"
          width={25}
          height={25}
        />
        {!disabledGithub ? "Login via GitHub" : "Loading..."}
      </button>
    </div>
  )
}

export default LoginViaApi;