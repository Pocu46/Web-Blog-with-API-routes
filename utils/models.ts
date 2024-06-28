export type PostsType = {
  id: string,
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