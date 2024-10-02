import React from "react";
import Button from "@/UI/Button";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import {EditUser, sessionUserType} from "@/utils/models";
import {userProfileImageUpdate} from "@/utils/http";
import {useSession} from "next-auth/react";

type AddPhotoComponentProps = {
  onClose: () => void;
}

const AddPhotoComponent: React.FC<AddPhotoComponentProps> = ({onClose}) => {
  const {data: session, update} = useSession()
  const sessionUser = session?.user as sessionUserType

  const [newProfilePhotoUrl, setNewProfilePhotoUrl] = React.useState<string | undefined>(sessionUser?.image?.imageLink)
  const [newProfilePhoto, setNewProfilePhoto] = React.useState<File | undefined>()

  const {mutate, isError, error} = useMutation<void, Error, EditUser, unknown>({
    mutationKey: ['editUserPhoto'],
    mutationFn: userProfileImageUpdate,
    onSuccess: async () => {
      await update({
        image: newProfilePhotoUrl
      })

      onClose()
    }
  })

  const addNewImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewProfilePhotoUrl(URL.createObjectURL(file))
      setNewProfilePhoto(file)
    }
  }

  const saveNewImageHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = new FormData()
    if(newProfilePhoto) formData.append("image", newProfilePhoto)

    try {
      mutate({formData, id: sessionUser?.id})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="bg-[#b2c2cd] h-[640px] w-[960px] p-[15px] rounded-xl backdrop:bg-[rgba(0,0,0,0.4)] flex justify-center items-center flex-col gap-3 overflow-y-auto"
      onClick={(event) => event.stopPropagation()}
      onSubmit={saveNewImageHandler}
    >
      <Image
        className="bg-white rounded-[50%] h-[256px] w-[256px] border-4 border-solid border-white"
        src={newProfilePhotoUrl ? `${newProfilePhotoUrl}` : "/defaultUserIcon.png"}
        alt="Profile Image"
        height={256}
        width={256}
      />
      <input
        id="profilePhoto"
        placeholder="Add new Photo"
        onChange={addNewImageHandler}
        className="h-auto w-full p-3 border-4 border-dashed border-[#528fd9] rounded-3xl relative"
        type="file"
      />
      <div className="flex items-center justify-center gap-3">
        <Button
          text="Upload"
          style="btn-primary bg-[#528fd9] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
          link="/"
          isButton={true}
          type="submit"
        />
        <Button
          text="Cancel"
          style="btn-primary bg-[#de5050] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px] my-5"
          link="/"
          action={onClose}
          isButton={true}
          type="button"
        />
      </div>
    </form>
  )
}

export default AddPhotoComponent;