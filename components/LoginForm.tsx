"use client"

import Input from "@/UI/Input";
import Link from "next/link";
import Button from "@/UI/Button";
import React, {useEffect, useState} from "react";
import {validateEmail, validatePassword} from "@/utils/methods";
import {signIn} from "next-auth/react";

const LoginForm = () => {
  const [loginVal, setLoginVal] = useState<string>('')
  const [loginError, setLoginError] = useState<boolean>(false)
  const [passwordVal, setPasswordVal] = useState<string>('')
  const [passwordValError, setPasswordError] = useState<boolean>(false)

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let isValid = true

    if (!validateEmail(loginVal.trim())) {
      setLoginError(true)
      isValid = false
    }
    if (!validatePassword(passwordVal.trim())) {
      setPasswordError(true)
      isValid = false
    }

    if (isValid) {
      signIn("credentials", {email: loginVal, password: passwordVal, callbackUrl: "/"})
    }
  }

  useEffect(() => {
      if (validateEmail(loginVal.trim())) {
        setLoginError(false)
      }
      if (validatePassword(passwordVal.trim())) {
        setPasswordError(false)
      }
    }, [loginVal, passwordVal]
  )

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal(event.target.value)
  }
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(event.target.value)
  }

  return (
    <form className="w-full h-auto" onSubmit={loginHandler}>
      <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">Login</h2>

      <Input
        id="loginLogin"
        label="Login *"
        placeholder="user@gmail.com"
        state={loginVal}
        type="text"
        changeHandler={loginChangeHandler}
        error={loginError}
        errorMessage="Email is wrong or doesn't exist"
      />
      <Input
        id="loginPassword"
        label="Password *"
        placeholder="Password"
        state={passwordVal}
        type="password"
        changeHandler={passwordChangeHandler}
        error={passwordValError}
        errorMessage="Wrong Password"
      />
      <div className="w-full flex justify-center">
        <span className="text-2xl">Go to <Link href="/registration"
                                               className="text-blue-700 underline">Registration</Link> page</span>
      </div>

      <Button
        text="Login"
        style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
        link="/"
        type="submit"
        isButton={true}
      />
    </form>
  )
}

export default LoginForm;