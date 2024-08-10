import {
  editPostProps,
  postActionProps,
  PostsType,
  registrationProps,
  SendPostProps
} from "@/utils/models";
import moment from "moment";
import {QueryClient} from "@tanstack/react-query";

export const queryClient: QueryClient = new QueryClient()

export const getPosts = async (): Promise<PostsType[] | []> => {
  const res = await fetch("/api/notes/list");
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  return data
}

export const sendPost = async ({userId, summary, text, type}: SendPostProps) => {
  const payload = {
    method: 'POST',
    body: JSON.stringify({
      userId,
      summary: summary?.trim(),
      text: text?.trim(),
      type: type,
      isFavorite: false,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
  }

  try {
    const response = await fetch("/api/notes/create", payload)

    if (!response?.ok) {
      throw Error('The Post isn\'t created!')
    }
  } catch {
    throw Error('Server doesn\'t available at this moment!')
  }
}

export const postAction = async ({id, summary, text, type, time, isFavorite, method}: postActionProps) => {
  const url: string = `${process.env.NEXT_PUBLIC_DB_URL_POST_CHANGE}/posts/${id}.json`
  let isFavoriteValue: boolean

  if (isFavorite === false) {
    isFavoriteValue = true
  } else {
    isFavoriteValue = false
  }

  let payload = {
    method: method,
    body: JSON.stringify({
      summary: summary.trim(),
      text: text.trim(),
      type,
      isFavorite: isFavoriteValue,
      time
    })
  }

  let message: string = 'Post isn\'t added to Favorites!'

  if (method === 'DELETE') {
    payload = {
      method: method,
      body: JSON.stringify({
        summary: summary.trim(),
        text: text.trim(),
        type,
        isFavorite: isFavoriteValue,
        time
      })
    }
    message = 'The Post isn\'t deleted!'
  }

  try {
    const response = await fetch(url, payload)

    if (!response?.ok) {
      throw Error(message)
    }
  } catch {
    throw Error(message)
  }
}

export const editPost = async ({id, summary, text, type, isFavorite}: editPostProps) => {
  const url: string = `${process.env.NEXT_PUBLIC_DB_URL_POST_CHANGE}/posts/${id}.json`

  const payload = {
    method: 'PATCH',
    body: JSON.stringify({
      summary,
      text,
      type,
      isFavorite,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
  }

  try {
    const response = await fetch(url, payload)

    if (!response?.ok) {
      throw Error("Post isn't edited. Please try again later!")
    }
  } catch {
    throw Error("Post isn't edited. Please try again later!")
  }
}

export const userRegistration = async ({email, userName, password, confirmPassword}: registrationProps) => {
  try {
    const response = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        userName,
        password,
        confirmPassword
      })
    })

    if (response.status !== 201) {
      throw new Error("User registration failed")
    }
  } catch (error) {
    console.log(error)
  }
}