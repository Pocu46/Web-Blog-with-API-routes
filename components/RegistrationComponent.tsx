"use client"

import React, {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";
import Button from "@/UI/Button";
import Input from "@/UI/Input";
import Link from "next/link";
import {validateEmail, validatePassword, validateStringLength} from "@/utils/methods";
import {userRegistration} from "@/utils/http";
import {useMutation} from "@tanstack/react-query";
import {registrationProps} from "@/utils/models";
import {signIn} from "next-auth/react";
import ErrorComponent from "@/components/ErrorComponent";

const RegistrationComponent = () => {
  const [loginVal, setLoginVal] = useState<string>('')
  const [loginError, setLoginError] = useState(false)
  const [nameVal, setNameVal] = useState<string>('')
  const [nameError, setNameError] = useState(false)
  const [passwordVal, setPasswordVal] = useState<string>('')
  const [passwordValError, setPasswordError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const {mutate, isError, error} = useMutation<void, Error, registrationProps, unknown>({
    mutationKey: ['createUser'],
    mutationFn: userRegistration,
    onSuccess: async () => {
      await signIn('credentials', {
        email: loginVal,
        password: passwordVal,
        callbackUrl: "/"
      })
    }
  })

  const registrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let isValid = true

    if(!validateEmail(loginVal)) {
      setLoginError(true)
      isValid = false
    }
    if(validateStringLength(nameVal, 3) || !nameVal) {
      setNameError(true)
      isValid = false
    }
    if(!validatePassword(passwordVal)) {
      setPasswordError(true)
      isValid = false
    }
    if(!validatePassword(confirmPassword)) {
      setConfirmPasswordError(true)
      isValid = false
    }
    if(passwordVal && confirmPassword && passwordVal !== confirmPassword) {
      setConfirmPasswordError(true)
      isValid = false
    }

    if(isValid) {
      try {
        mutate({
          email: loginVal,
          name: nameVal,
          password: passwordVal,
          confirmPassword: confirmPassword
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if(validateEmail(loginVal)) {
      setLoginError(false)
    }
    if(!validateStringLength(nameVal, 3)) {
      setNameError(false)
    }
    if(validatePassword(passwordVal)) {
      setPasswordError(false)
    }
    if(validatePassword(confirmPassword)) {
      setConfirmPasswordError(false)
    }
    if(validatePassword(passwordVal) && validatePassword(confirmPassword) && passwordVal === confirmPassword) {
      setConfirmPasswordError(false)
    }
  }, [loginVal, nameVal, passwordVal, confirmPassword])

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal(event.target.value)
  }
  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameVal(event.target.value)
  }
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(event.target.value)
  }
  const confirmPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  if(isError) {
    return (
      <ErrorComponent
        error={error}
        reset={
          () => {
            mutate({
              email: loginVal,
              name: nameVal,
              password: passwordVal,
              confirmPassword: confirmPassword
            })
          }
        }
      />
    )
  }

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full h-[100vh] flex justify-center pt-[64px] min-h-[calc(100vh_-_64px)]"
    >
      <form className="w-full h-auto" onSubmit={registrationHandler}>
        <h2 className="text-center text-3xl font-[500] leading-[1.2] mb-2">Registration</h2>

        <Input
          id="registrationLogin"
          label="Email *"
          placeholder="user@gmail.com"
          state={loginVal}
          type="text"
          changeHandler={loginChangeHandler}
          error={loginError}
          errorMessage="Email should have '@' symbol"
        />
        <Input
          id="registrationname"
          label="User Name *"
          placeholder="John Doe"
          state={nameVal}
          type="text"
          changeHandler={nicknameChangeHandler}
          error={nameError}
          errorMessage="User Name field should have at least 3 letters"
        />
        <Input
          id="registrationPassword"
          label="Password *"
          placeholder="Password"
          state={passwordVal}
          type="password"
          changeHandler={passwordChangeHandler}
          error={passwordValError}
          errorMessage="Password field should have at least 6 symbols and include letters, upper case, digits"
        />
        <Input
          id="registrationConfirmPassword"
          label="Confirm Password *"
          placeholder="Confirm Password"
          state={confirmPassword}
          type="password"
          changeHandler={confirmPasswordChangeHandler}
          error={confirmPasswordError}
          errorMessage="Confirm Password field should have at least 6 symbols and include letters, upper case, digits and should match to 'Password' field"
        />
        <div className="w-full flex justify-center">
          <span className="text-2xl">Return to <Link href="/login" className="text-blue-700 underline">Login</Link> page</span>
        </div>

        <Button
          text="Registration"
          style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
          link="/"
          type="submit"
          isButton={true}
        />
      </form>
    </Transition>
  )
}

export default RegistrationComponent;