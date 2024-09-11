"use client"

import Image from "next/image";
import Button from "@/UI/Button";
import React, {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";
import Input from "@/UI/Input";
import {validateEmail, validatePassword, validateStringLength} from "@/utils/methods";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import Modal from "@/components/Modal";
import AddPhotoComponent from "@/components/AddPhotoComponent";
// import {userUpdate} from "@/utils/http";
import {EditUser} from "@/utils/models";

type EditProfileComponentProps = {
  id: string;
  email: string | undefined;
  name: string;
  image: string | { imageName: string; imageLink: string } | undefined;
  imageName: string;
}

const EditProfileComponent: React.FC<EditProfileComponentProps> = ({id, email, name, image, imageName}) => {
  const [loginVal, setLoginVal] = useState<string | undefined>(email)
  const [loginError, setLoginError] = useState(false)
  const [nameVal, setnameVal] = useState<string>(name)
  const [nameError, setnameError] = useState(false)
  const [passwordVal, setPasswordVal] = useState<string>('')
  const [passwordValError, setPasswordError] = useState(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  // const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | {
  //   imageName: string;
  //   imageLink: string
  // } | undefined>(image)
  // const [profilePhotoName, setProfilePhotoName] = React.useState<string>(imageName)
  // const [profilePhoto, setProfilePhoto] = useState<File | undefined>()
  // const router = useRouter()

  // const {mutate, isError, error} = useMutation<void, Error, EditUser, unknown>({
  //   mutationKey: ['editUser'],
  //   mutationFn: userUpdate,
  //   onSuccess: async () => {
  //     router.push(`/profile/${id}`)
  //   }
  // })

  const userEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let isValid = true

    if (loginVal && !validateEmail(loginVal)) {
      setLoginError(true)
      isValid = false
    }
    if (validateStringLength(nameVal, 3)) {
      setnameError(true)
      isValid = false
    }
    if (passwordVal && !validatePassword(passwordVal)) {
      setPasswordError(true)
      isValid = false
    }

    if (isValid && loginVal) {
      try {
        // mutate({formData, id})
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (loginVal && validateEmail(loginVal)) {
      setLoginError(false)
    }
    if (!validateStringLength(nameVal, 3)) {
      setnameError(false)
    }
    if (validatePassword(passwordVal)) {
      setPasswordError(false)
    }
  }, [loginVal, nameVal, passwordVal])

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal(event.target.value)
  }
  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnameVal(event.target.value)
  }
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(event.target.value)
  }
  const modalOpenHandler = () => {
    setModalOpen(true)
  }
  const modalCloseHandler = () => {
    setModalOpen(false)
  }
  // const addNewPhotoUrlHandler = (photo: string | { imageName: string; imageLink: string } | undefined) => {
  //   setProfilePhotoUrl(photo)
  // }
  // const addNewPhotoHandler = (photoFile: File | undefined) => {
  //   // setProfilePhoto(photoFile)
  // }
  // const addNewPhotoNameHandler = (photoName: string) => {
  //   setProfilePhotoName(photoName)
  // }

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
          // src={profilePhotoUrl ? `${profilePhotoUrl}` : "/defaultUserIcon.png"}
          src={image ? `${image}` : "/defaultUserIcon.png"}
          alt="Profile Image"
          height={256}
          width={256}
        />

        <Button
          action={modalOpenHandler}
          text="Change Photo"
          style="btn-primary bg-[#dede01] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
          link={`/`}
          isButton={true}
          type="button"
        />

        <Modal
          style="h-full w-full z-[5] bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 z-[5] flex justify-center items-start pt-[128px]"
          open={modalOpen}
          onClose={modalCloseHandler}
          root="modalId"
        >
          <AddPhotoComponent
            onClose={modalCloseHandler}
            // image={profilePhotoUrl}
            image={image}
            imageName={imageName}
            // addNewPhotoURL={addNewPhotoUrlHandler}
            // addNewPhotoName={addNewPhotoNameHandler}
            // addNewPhoto={addNewPhotoHandler}
            id={id}
          />
        </Modal>

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
            id="editProfilename"
            label="Change User Name *"
            placeholder="John Doe"
            state={nameVal}
            type="text"
            changeHandler={nicknameChangeHandler}
            error={nameError}
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