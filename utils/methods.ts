import {deleteObject, getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from "@/firebase";
import {uuidv4} from "@firebase/util";

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email.trim());
}

export const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password.trim());
}

export const validateStringLength = (value: string | undefined, length: number) => {
  if(value && value.trim().length < length) {
    return true
  }
  return false
}

export async function uploadImage(image: File | undefined) {
  try {
    if(image) {
      const imageRef = ref(
        storage,
        `profile-photo/${image.name.slice(0, -4)}-${uuidv4()}`
      )

      const imageResponse = await uploadBytes(imageRef, image)
      const imageUrl = await getDownloadURL(
        ref(storage, `profile-photo/${imageResponse.metadata.name}`)
      )

      return {
        imageLink: imageUrl,
        imageName: imageResponse.metadata.name,
      }
    }
  } catch (error) {
    console.error(error)
    throw new Error("Failed to save image")
  }
}

export async function deleteImage(imageName: string | undefined) {
  const deleteResponse = await deleteObject(
    ref(storage, `profile-photo/${imageName}`)
  )
}