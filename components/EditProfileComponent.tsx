"use client"

import Image from "next/image";
import Button from "@/UI/Button";
import React, {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";
import Input from "@/UI/Input";
import {validateEmail, validatePassword, validateStringLength} from "@/utils/methods";
import {useMutation} from "@tanstack/react-query";
import {editUser} from "@/utils/models";
import {useRouter} from "next/navigation";

type EditProfileComponentProps = {
  id: string;
  email: string | undefined;
  username: string;
  image: string | undefined;
}

const EditProfileComponent: React.FC<EditProfileComponentProps> = ({id, email, username, image}) => {
  const [loginVal, setLoginVal] = useState<string | undefined>(() => email)
  const [loginError, setLoginError] = useState(false)
  const [userNameVal, setUserNameVal] = useState<string>(() => username)
  const [userNameError, setUserNameError] = useState(false)
  const [passwordVal, setPasswordVal] = useState<string>('')
  const [passwordValError, setPasswordError] = useState(false)
  const router = useRouter()

  const {mutate, isError, error} = useMutation<void, Error, editUser, unknown>({
    mutationKey: ['editUser'],
    mutationFn: async () => {},
    onSuccess: async () => {
      router.push(`/profile/${id}`)
    }
  })

  const userEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let isValid = true

    if (loginVal && !validateEmail(loginVal.trim())) {
      setLoginError(true)
      isValid = false
    }
    if (validateStringLength(userNameVal, 3)) {
      setUserNameError(true)
      isValid = false
    }
    if (!validatePassword(passwordVal.trim())) {
      setPasswordError(true)
      isValid = false
    }

    if (isValid && loginVal) {
      try {
        mutate({
          email: loginVal,
          userName: userNameVal,
          password: passwordVal,
          image: image || ""
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (loginVal && validateEmail(loginVal.trim())) {
      setLoginError(false)
    }
    if (userNameVal.trim().length >= 3) {
      setUserNameError(false)
    }
    if (validatePassword(passwordVal.trim())) {
      setPasswordError(false)
    }
  }, [loginVal, userNameVal, passwordVal])

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal(event.target.value)
  }
  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameVal(event.target.value)
  }
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(event.target.value)
  }

  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full h-[calc(100vh_-_64px)] flex justify-center pt-[64px] overflow-hidden"
    >
      <form
        className="flex flex-col justify-start items-center py-[64px] min-h-[calc(100vh_-_64px)] w-full bg-gradient-to-b"
        onSubmit={userEditHandler}
      >
        <Image
          className="bg-white rounded-[50%] h-[256px] w-[256px] border-4 border-solid border-white"
          src={image ? image : "/defaultUserIcon.png"}
          alt="Profile Image"
          height={256}
          width={256}
        />

        <Button
          action={() => {}}
          text="Change Photo"
          style="btn-primary bg-[#dede01] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
          link={`/profile/edit`}
        />

        <div className="flex justify-center items-center flex-col gap-3 w-full">
          <Input
            id="editProfileEmail"
            label="Change Email *"
            placeholder="user@gmail.com"
            state={loginVal ? loginVal : ""}
            type="text"
            changeHandler={loginChangeHandler}
            error={loginError}
            errorMessage="Email should have '@' symbol"
          />
          <Input
            id="editProfileUserName"
            label="Change User Name *"
            placeholder="John Doe"
            state={userNameVal}
            type="text"
            changeHandler={nicknameChangeHandler}
            error={userNameError}
            errorMessage="User Name field should have at least 3 letters"
          />
          <Input
            id="editProfilePassword"
            label="Change Password"
            placeholder="Password"
            state={passwordVal}
            type="password"
            changeHandler={passwordChangeHandler}
            error={passwordValError}
            errorMessage="Password field should have at least 6 symbols and include letters, upper case, digits"
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <Button
            text="Submit"
            style="btn-primary bg-[#528fd9] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
            link={"/"}
            type="submit"
            isButton={true}
          />
          <Button
            text="Cancel"
            style="btn-primary bg-[#BCC6CC] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
            link={`/profile/${id}`}
          />
        </div>
      </form>
    </Transition>
  )
}

export default EditProfileComponent;