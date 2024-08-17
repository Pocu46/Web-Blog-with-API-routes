type PostCrator = {
  _id: string;
  email: string;
  username: string;
}

export type PostsType = {
  _id: string;
  creator: PostCrator,
  summary: string,
  text: string,
  type: string,
  time: string,
  isFavorite: boolean,
  page?: string
}

export type PostResponse = {
  isFavorite: boolean;
  summary: string;
  text: string;
  time: string;
  type: string;
}

export type PostsData = {
  [id: string]: PostResponse;
}

export type PostType = "Note" | "News";

export type SendPostProps = {
  userId: string;
  summary?: string;
  text?: string;
  type?: string | PostType
}

export type postActionProps = {
  id: string;
  summary: string;
  text: string;
  type: string | PostType;
  time: string;
  isFavorite: boolean;
  method: "PUT" | "DELETE"
}

export type editPostProps = {
  id?: string;
  summary?: string;
  text?: string;
  isFavorite?: boolean;
  type?: string | PostType
}

export type registrationProps = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export type editUser = {
  email: string;
  userName: string;
  password: string;
  image?: string;
}

export type sessionUserType = {
  id: string;
  username: string;
  email?: string;
  image?: string;
}