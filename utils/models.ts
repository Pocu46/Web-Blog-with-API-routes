type PostCrator = {
  _id: string;
  email: string;
  name: string;
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
  name: string;
  password: string;
  confirmPassword: string;
}

export type sessionUserType = {
  id: string;
  name: string;
  email?: string;
  image?: {
    imageName: string;
    imageLink: string;
  };
}

export type EditUser = {
  formData: FormData;
  id: string;
}

export type EditUserData = {
  email: string | undefined;
  name: string;
  password: string;
  id: string;
}