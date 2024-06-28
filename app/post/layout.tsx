import React from "react";
import PostsHeader from "@/components/PostsHeader";

const Posts = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-center flex-col">
      <PostsHeader />

      {children}
    </div>
  )
}

export default Posts;
